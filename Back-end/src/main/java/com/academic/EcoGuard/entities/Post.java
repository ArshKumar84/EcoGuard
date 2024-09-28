package com.academic.EcoGuard.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.UuidGenerator;

@Entity
public class Post {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    private String id;

    @Column(length = 500)
    private String data;

    private long likes;

    @ManyToOne
    private User user;

}

