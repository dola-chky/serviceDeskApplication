package com.assignment.serviceDeskApplication.controller;

import com.assignment.serviceDeskApplication.model.Ticket;
import com.assignment.serviceDeskApplication.model.TicketPriority;
import com.assignment.serviceDeskApplication.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
public class TicketController {
    @Autowired
    TicketRepository ticketRepository;

    // Get all tickets
    @RequestMapping(value = "/tickets", method = RequestMethod.GET)
    public Map<String, Object> getAllTickets() {
        List<Ticket> ticketList = ticketRepository.findAll();
        List<TicketPriority> priorityList = Arrays.asList(TicketPriority.values());
        Map<String, Object> resultMap = new HashMap();
        resultMap.put("tickets", ticketList);
        resultMap.put("priorities", priorityList);
        return resultMap;
    }

    //Create a new ticket from json request body
    @RequestMapping(value = "/ticket", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createTicket(@RequestBody Ticket ticket) {
        try{
            Date creatonDate = new Date();
            ticket.setCreationDate(creatonDate);
            Ticket newTicket = ticketRepository.save(ticket);
            return new ResponseEntity<Ticket>(HttpStatus.CREATED);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Get a single ticket in json format
    @RequestMapping(value = "ticket/{id}", method = RequestMethod.GET, produces = APPLICATION_JSON_VALUE)
    public Ticket getTicket(@PathVariable(value = "id") Long id) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        return ticket;
    }

    // Update a ticket by json
    @RequestMapping(value = "/ticket/{id}", method = RequestMethod.PUT, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateTicket(@PathVariable(value = "id") Long id,
                                               @RequestBody Ticket ticket){

        Ticket oldTicket = ticketRepository.findById(id)
                .orElse(null);

        if(oldTicket != null) {
            oldTicket.setTitle(ticket.getTitle());
            oldTicket.setDescription(ticket.getDescription());
            oldTicket.setCreationDate(ticket.getCreationDate());
                Ticket updatedTicket = ticketRepository.save(oldTicket);
                return new ResponseEntity<Ticket>(HttpStatus.OK);

        }else{
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

    }


    // Delete a ticket
    @RequestMapping(value = "/ticket/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTicket(@PathVariable(value = "id") Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElse(null);

        if(ticket != null){
            ticketRepository.delete(ticket);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
