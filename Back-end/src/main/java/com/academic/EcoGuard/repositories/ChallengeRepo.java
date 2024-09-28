package com.academic.EcoGuard.repositories;

import com.academic.EcoGuard.entities.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepo extends JpaRepository<Challenge,String> {

}
