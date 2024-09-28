package com.academic.EcoGuard.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;

@Entity
public class Challenge {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    private String id;

    private int goal;

    @Column(name = "Trees Planted")
    private int numTrees;

    @ManyToMany
    private List<User> userList;

}
