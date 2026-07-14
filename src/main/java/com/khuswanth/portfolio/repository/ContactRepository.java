package com.khuswanth.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.khuswanth.portfolio.model.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
}