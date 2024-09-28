package com.academic.EcoGuard.dtos;

import com.academic.EcoGuard.entities.User;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Getter
@Setter
public class DonationDto {

    private String id;

    @NotBlank
    private int amount;

    private CardDto  dto;

    private String upi;

    @ManyToOne
    private User user;
}
