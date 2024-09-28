package com.academic.EcoGuard.services;

import com.academic.EcoGuard.dtos.ChallengeDto;
import com.academic.EcoGuard.entities.Challenge;
import com.academic.EcoGuard.entities.User;
import com.academic.EcoGuard.exceptionsHandler.ResourceNotFoundException;
import com.academic.EcoGuard.repositories.ChallengeRepo;
import com.academic.EcoGuard.repositories.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ChallengeServiceImpl implements ChallengeService {

    private ModelMapper mapper;
    private ChallengeRepo challengeRepo;
    private UserRepo userRepo;

    public ChallengeServiceImpl(ModelMapper mapper, ChallengeRepo challengeRepo, UserRepo userRepo) {
        this.mapper = mapper;
        this.challengeRepo = challengeRepo;
        this.userRepo = userRepo;
    }

    @Override
    public ChallengeDto join(String id,ChallengeDto ChallengeDto) {

        User user = userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        Challenge challenge= mapper.map(ChallengeDto,Challenge.class);
        challengeRepo.save(challenge);
        user.getChallengeList().add(challenge);
        return mapper.map(challenge,ChallengeDto.class);
    }

    @Override
    public ChallengeDto read(String id) {
        Challenge Challenge = challengeRepo.findById(id).orElseThrow(ResourceNotFoundException::new);
        return mapper.map(Challenge,ChallengeDto.class);
    }

    @Override
    public ChallengeDto update(String id, ChallengeDto ChallengeDto) {
        Challenge Challenge= mapper.map(ChallengeDto,Challenge.class);
        challengeRepo.findById(id).orElseThrow(ResourceNotFoundException::new);
        Challenge= challengeRepo.save(Challenge);
        return mapper.map(Challenge,ChallengeDto.class);
    }

    @Override
    public void delete(String id) {
        Challenge Challenge= challengeRepo.findById(id).orElseThrow(ResourceNotFoundException::new);
        challengeRepo.delete(Challenge);
    }

}
