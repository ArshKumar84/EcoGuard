package com.academic.EcoGuard.services;

import com.academic.EcoGuard.dtos.CTokenDto;
import com.academic.EcoGuard.dtos.ChallengeDto;
import com.academic.EcoGuard.dtos.PostDto;
import com.academic.EcoGuard.dtos.UserDto;
import com.academic.EcoGuard.entities.CToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    //create
    UserDto create(UserDto userDto);

    //read
    UserDto read(String id);


    //readAll
    public Page<UserDto> readAll(Pageable pageable);

    //readAll Posts
    public Page<PostDto> readAllPosts(String id,Pageable pageable);

    //readAll Challenges
    public Page<ChallengeDto> readAllChallenges(String id, Pageable pageable);

    //update
    UserDto update(String id,UserDto userDto);

    public String login(String username, String password);

    void delete(String id);

    //find
    public Page<UserDto> find(String username,Pageable pageable);

}
