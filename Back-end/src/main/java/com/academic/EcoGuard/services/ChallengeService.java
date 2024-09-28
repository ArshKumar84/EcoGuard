package com.academic.EcoGuard.services;

import com.academic.EcoGuard.dtos.ChallengeDto;

public interface ChallengeService {

    //create
    ChallengeDto join(String id,ChallengeDto ChallengeDto);

    //read
    ChallengeDto read(String id);

    //update
    ChallengeDto update(String id,ChallengeDto ChallengeDto);

    //delete
    void delete(String id);

}
