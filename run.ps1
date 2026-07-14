# PowerShell Script to automatically set up portable Maven and run the Spring Boot project
$ErrorActionPreference = "Continue"
$ProgressPreference = "SilentlyContinue"

$MavenVersion = "3.9.8"
$MavenZip = "apache-maven-$MavenVersion-bin.zip"
$MavenUrl = "https://archive.apache.org/dist/maven/maven-3/$MavenVersion/binaries/$MavenZip"
$LocalMavenDir = Join-Path $PSScriptRoot ".maven"
$MavenHome = Join-Path $LocalMavenDir "apache-maven-$MavenVersion"
$MvnPath = Join-Path $MavenHome "bin"

# Default fallback environment variables
$DB_PASSWORD = "2205"
$DB_USERNAME = "root"
$DB_URL = "jdbc:mysql://localhost:3306/portfolio_db"

# Load variables from .env if it exists
if (Test-Path "$PSScriptRoot\.env") {
    Get-Content "$PSScriptRoot\.env" | Where-Object { $_ -match '=' -and $_ -notlike '#*' } | ForEach-Object {
        $name, $value = $_.Split('=', 2)
        $trimmedName = $name.Trim()
        $trimmedValue = $value.Trim()
        New-Variable -Name $trimmedName -Value $trimmedValue -Force -ErrorAction SilentlyContinue
        Set-Item -Path "env:$trimmedName" -Value $trimmedValue
    }
}

# Clean up any previously failed/corrupted downloads
$ZipPath = Join-Path $LocalMavenDir $MavenZip
if (Test-Path $ZipPath) {
    $fileSize = (Get-Item $ZipPath).Length
    if ($fileSize -lt 5MB) {
        Write-Host "Detected corrupted or incomplete Maven zip ($($fileSize / 1MB) MB). Cleaning up..." -ForegroundColor Yellow
        Remove-Item $ZipPath -Force
    }
}

# 1. Download and set up Maven if not present
if (-not (Test-Path (Join-Path $MvnPath "mvn.cmd"))) {
    Write-Host "Maven not found locally. Downloading portable Apache Maven $MavenVersion..." -ForegroundColor Cyan
    
    if (-not (Test-Path $LocalMavenDir)) {
        New-Item -ItemType Directory -Path $LocalMavenDir | Out-Null
    }
    
    Write-Host "Downloading from $MavenUrl..." -ForegroundColor Gray
    try {
        if (Get-Command Start-BitsTransfer -ErrorAction SilentlyContinue) {
            Start-BitsTransfer -Source $MavenUrl -Destination $ZipPath
        } else {
            Invoke-WebRequest -Uri $MavenUrl -OutFile $ZipPath
        }
    } catch {
        Write-Host "Download failed via standard methods. Trying alternative download method..." -ForegroundColor Yellow
        $webClient = New-Object System.Net.WebClient
        $webClient.DownloadFile($MavenUrl, $ZipPath)
    }
    
    if (Test-Path $ZipPath) {
        Write-Host "Extracting Maven archive..." -ForegroundColor Gray
        Expand-Archive -Path $ZipPath -DestinationPath $LocalMavenDir -Force
        Write-Host "Cleaning up downloaded archive..." -ForegroundColor Gray
        Remove-Item $ZipPath -Force
        Write-Host "Portable Maven setup completed successfully!" -ForegroundColor Green
    } else {
        Write-Error "Failed to download Maven. Please check your internet connection."
        exit 1
    }
}

# 2. Add Maven bin to Path for this session
$env:Path = "$MvnPath;" + $env:Path

# 3. Auto-create MySQL database if CLI is available
if (Get-Command mysql -ErrorAction SilentlyContinue) {
    $DbName = "portfolio_db"
    if ($DB_URL -match "localhost:3306/([^?]+)") {
        $DbName = $Matches[1]
    }
    Write-Host "Checking/Creating Database: $DbName..." -ForegroundColor Cyan
    try {
        mysql -u $DB_USERNAME -p$DB_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DbName;" 2>$null
        Write-Host "Database '$DbName' ready." -ForegroundColor Green
    } catch {
        Write-Host "Warning: Could not connect to MySQL to verify database. The application will attempt to connect anyway." -ForegroundColor Yellow
    }
}

# 4. Verify Maven works
Write-Host "`nChecking Maven Version:" -ForegroundColor Gray
mvn -v

# 5. Start background job to open Swagger UI once server is up
Write-Host "`nInitializing Swagger UI auto-launch listener..." -ForegroundColor Cyan
Start-Job -ScriptBlock {
    $url = "http://localhost:8080/swagger-ui/index.html"
    $maxAttempts = 45
    $attempt = 0
    while ($attempt -lt $maxAttempts) {
        try {
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2 -ErrorAction SilentlyContinue
            if ($response.StatusCode -eq 200 -or $response.Content.Length -gt 0) {
                # Success - launch Swagger in default browser
                Start-Process $url
                break
            }
        } catch {
            # Application is still booting
        }
        Start-Sleep -Seconds 2
        $attempt++
    }
} | Out-Null

# 6. Run Spring Boot application
Write-Host "`nLaunching Spring Boot application..." -ForegroundColor Green
mvn spring-boot:run
