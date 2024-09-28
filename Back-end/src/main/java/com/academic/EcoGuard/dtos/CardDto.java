package com.academic.EcoGuard.dtos;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;

@Embeddable
public class CardDto {

    @NotBlank
    private String number;

    @NotBlank
    private String date;

    @NotBlank
    private String cvv;

}
