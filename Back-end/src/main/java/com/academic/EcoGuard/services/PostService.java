package com.academic.EcoGuard.services;

import com.academic.EcoGuard.dtos.PostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {

    //create
    PostDto create(String id,PostDto postDto);

    //read
    PostDto read(String id);

    Page<PostDto> readAll(Pageable pageable);

    //update
    PostDto update(String id,PostDto postDto);

    //delete
    void delete(String id);

    //find
    Page<PostDto> find(String data, Pageable pageable);
    
}
