package com.academic.EcoGuard.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Getter
@Setter
public class CToken {

    public CToken() {
    }

    public CToken(String token) {
        this.token = token;
    }

    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    private String id;

    private String token;

    @OneToOne
    private User user;
}
