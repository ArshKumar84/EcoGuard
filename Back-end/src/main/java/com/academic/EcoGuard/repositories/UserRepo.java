package com.academic.EcoGuard.repositories;

import com.academic.EcoGuard.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User,String> {

    public List<User> findUserByUsernameContaining(String username);

    public Optional<User> findUserByUsername(String username);

}
