package com.assignment.serviceDeskApplication.repository;

import com.assignment.serviceDeskApplication.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByTitle(String title);

}
