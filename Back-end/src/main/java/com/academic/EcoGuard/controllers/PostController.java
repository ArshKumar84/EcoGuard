package com.academic.EcoGuard.controllers;

import com.academic.EcoGuard.dtos.PostDto;
import com.academic.EcoGuard.services.PostServiceImpl;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/posts")
@ResponseBody

public class PostController {
    PostServiceImpl service;

    public PostController(PostServiceImpl service) {
        this.service = service;
    }

    @PostMapping("/{id}")
    ResponseEntity<PostDto> create(@PathVariable String id, @RequestBody PostDto dto)
    {
        return ResponseEntity.ok(service.create(id,dto));
    }

    @GetMapping
    ResponseEntity<Page<PostDto>> getAll(Pageable pageable)
    {
        return ResponseEntity.ok(service.readAll(pageable));
    }

    @GetMapping("/{id}")
    ResponseEntity<PostDto> get(@PathVariable String id)
    {
        return ResponseEntity.ok(service.read(id));
    }

    @GetMapping("/search")
    ResponseEntity<Page<PostDto>> find(@RequestParam(name = "data") String data,Pageable pageable)
    {
        return ResponseEntity.ok(service.find(data,pageable));
    }

    @PutMapping("/{id}")
    ResponseEntity<PostDto> update(@PathVariable("id") String id,@RequestBody PostDto dto)
    {
        return ResponseEntity.ok(service.update(id,dto));
    }
}
