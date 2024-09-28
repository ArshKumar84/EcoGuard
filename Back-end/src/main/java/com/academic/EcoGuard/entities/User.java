package com.academic.EcoGuard.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.validator.constraints.UUID;

import java.util.List;

@Entity
@Getter
@Setter
public class User {


    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    private String id;


    @Column(unique = true)
    private String username;

    private String location;

    @Column(nullable = true)
    private String email;

    private String password;

    @Column(name = "Trees Planted")
    private long numTrees;

    private Boolean verified;

    @OneToOne(mappedBy = "user")
    private CToken token;

    @Getter
    @OneToMany(mappedBy = "user")
    private List<Post> postList;

    @Getter
    @ManyToMany(mappedBy = "userList")
    private List<Challenge> challengeList;

    @Getter
    @ManyToMany(mappedBy = "userList")
    private List<Donation> donationList;

    @ManyToMany(mappedBy = "userList")
    private List<Event> eventList;

}
