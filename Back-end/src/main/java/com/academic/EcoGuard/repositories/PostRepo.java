package com.academic.EcoGuard.repositories;

import com.academic.EcoGuard.entities.Post;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepo extends JpaRepository<Post,String> {

    public List<Post> findByDataContaining(String data);

}
