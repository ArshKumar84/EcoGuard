package com.academic.EcoGuard.dtos;

import com.academic.EcoGuard.entities.User;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CTokenDto {
    private String id;

    private String token;
}
