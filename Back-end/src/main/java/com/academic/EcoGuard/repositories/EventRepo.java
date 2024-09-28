package com.academic.EcoGuard.repositories;

import com.academic.EcoGuard.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepo extends JpaRepository<Event,String> {
}
