package com.academic.EcoGuard.services;

import com.academic.EcoGuard.dtos.ChallengeDto;
import com.academic.EcoGuard.dtos.OtpDto;
import com.academic.EcoGuard.dtos.PostDto;
import com.academic.EcoGuard.dtos.UserDto;
import com.academic.EcoGuard.entities.Challenge;
import com.academic.EcoGuard.entities.Post;
import com.academic.EcoGuard.entities.User;
import com.academic.EcoGuard.exceptionsHandler.InvalidParametersException;
import com.academic.EcoGuard.exceptionsHandler.ResourceNotFoundException;
import com.academic.EcoGuard.repositories.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    private ModelMapper mapper;
    private UserRepo repo;

    public UserServiceImpl(ModelMapper mapper, UserRepo repo) {
        this.mapper = mapper;
        this.repo = repo;
    }

    @Override
    public UserDto create(UserDto userDto) {

        User user= mapper.map(userDto,User.class);
        user=repo.save(user);
        return mapper.map(user,UserDto.class);
    }




    @Override
    public UserDto read(String id) {
        User user = repo.findById(id).orElseThrow(ResourceNotFoundException::new);
        return mapper.map(user,UserDto.class);
    }


    @Override
    public String login(String username,String password)
    {
        User user = repo.findUserByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        UserDto dto=mapper.map(user,UserDto.class);
        if(dto.getPassword().equals(password)) return dto.getId();
        else throw new InvalidParametersException("Wrong Password");
    }


//    public Boolean verify(OtpDto dto)
//    {
//        User user = repo.findById(dto.userId).orElseThrow(
//                () -> new ResourceNotFoundException("User not found")
//        );
//        return user.getVerified();
//    }

    @Override
    public Page<UserDto> readAll(Pageable pageable)
    {
        Page<User> userPage= repo.findAll(pageable);
        List<UserDto> userDtoList=userPage
                .stream()
                .map(
                        user -> mapper.map(user, UserDto.class)
                ).toList();
        return new PageImpl<>(userDtoList,pageable,userPage.getTotalElements());
    }

    @Override
    public Page<PostDto> readAllPosts(String id, Pageable pageable) {
        User user=repo.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("User Not Found")
        );
        List<Post> postList = user.getPostList();
        List<PostDto> postDtoList=postList
                .stream()
                .map(
                        post -> mapper.map(post,PostDto.class)
                ).toList();
        return new PageImpl<>(postDtoList,pageable,postList.size());
    }

    @Override
    public Page<ChallengeDto> readAllChallenges(String id, Pageable pageable) {
        User user=repo.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("User Not Found")
        );
        List< Challenge> challengeList = user.getChallengeList();
        List<ChallengeDto> challengeDtoList=challengeList
                .stream()
                .map(
                        challenge -> mapper.map(challenge,ChallengeDto.class)
                ).toList();
        return new PageImpl<>(challengeDtoList,pageable,challengeList.size());
    }


    @Override
    public UserDto update(String id, UserDto userDto) {
        User user= mapper.map(userDto,User.class);
        repo.findById(id).orElseThrow(ResourceNotFoundException::new);
        user=repo.save(user);
        return mapper.map(user,UserDto.class);
    }

    @Override
    public void delete(String id) {
        User user=repo.findById(id).orElseThrow(ResourceNotFoundException::new);
        repo.delete(user);
    }

    @Override
    public Page<UserDto> find(String username,Pageable pageable) {

        List<User> userList=repo.findUserByUsernameContaining(username);
        List<UserDto> userDtoList= userList.stream().map(
              user -> mapper.map(user, UserDto.class)
                ).toList();
        return new PageImpl<>(userDtoList,pageable,userList.size());
    }

}
