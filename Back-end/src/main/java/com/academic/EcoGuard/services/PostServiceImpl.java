package com.academic.EcoGuard.services;

import com.academic.EcoGuard.dtos.PostDto;
import com.academic.EcoGuard.entities.Post;
import com.academic.EcoGuard.entities.User;
import com.academic.EcoGuard.exceptionsHandler.ResourceNotFoundException;
import com.academic.EcoGuard.repositories.PostRepo;
import com.academic.EcoGuard.repositories.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {


    private ModelMapper mapper;
    private PostRepo postRepo;
    private UserRepo userRepo;

    public PostServiceImpl(ModelMapper mapper, PostRepo postRepo, UserRepo userRepo) {
        this.mapper = mapper;
        this.postRepo = postRepo;
        this.userRepo = userRepo;
    }

    @Override
    public PostDto create(String id,PostDto PostDto) {

        User user = userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found"));
        Post Post= mapper.map(PostDto,Post.class);
        Post= postRepo.save(Post);
        return mapper.map(Post,PostDto.class);
    }

    @Override
    public PostDto read(String id) {
        Post Post = postRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Post not found"));
        return mapper.map(Post,PostDto.class);
    }

    @Override
    public Page<PostDto> readAll(Pageable pageable) {

        Page<Post> postPage= postRepo.findAll(pageable);
        List<PostDto> postDtoList = postPage.stream().map(
                post -> mapper.map(post, PostDto.class)
        ).toList();

        return new PageImpl<>(postDtoList,pageable,postPage.getTotalElements());
    }

    @Override
    public PostDto update(String id, PostDto PostDto) {
        postRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Post not found"));
        Post Post= mapper.map(PostDto,Post.class);
        Post= postRepo.save(Post);
        return mapper.map(Post,PostDto.class);
    }

    @Override
    public void delete(String id) {
        Post Post= postRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Post not found"));
        postRepo.delete(Post);
    }

    @Override
    public Page<PostDto> find(String data, Pageable pageable) {

        List<Post> postList= postRepo.findByDataContaining(data);
        List<PostDto> postDtoList= postList.stream().map(
                post -> mapper.map(post, PostDto.class)
        ).toList();
        return new PageImpl<>(postDtoList,pageable,postList.size());
    }
    
}
