package com.academic.EcoGuard.services;

import com.academic.EcoGuard.dtos.EventDto;
import com.academic.EcoGuard.entities.Event;
import com.academic.EcoGuard.entities.User;
import com.academic.EcoGuard.exceptionsHandler.ResourceNotFoundException;
import com.academic.EcoGuard.repositories.EventRepo;
import com.academic.EcoGuard.repositories.UserRepo;
import org.modelmapper.ModelMapper;

import java.util.Optional;

public class EventServiceImpl implements EventService {

    EventRepo eventRepo;
    UserRepo userRepo;
    ModelMapper mapper;

    public EventServiceImpl(EventRepo eventRepo, UserRepo userRepo, ModelMapper mapper) {
        this.eventRepo = eventRepo;
        this.userRepo = userRepo;
        this.mapper = mapper;
    }

    @Override
    public EventDto join(String evenId, String userId) {
        Event event = eventRepo.findById(evenId).orElseThrow(()->new ResourceNotFoundException("Event not found"));
        User user = userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User not found"));
        user.getEventList().add(event);
        return mapper.map(event,EventDto.class);
    }
}
