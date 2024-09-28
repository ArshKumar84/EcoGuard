package com.academic.EcoGuard.dtos;

import jakarta.persistence.Embeddable;

@Embeddable
public class LocationDto {

    private String area;

    private String district;

    private String state;

    private String country;

}
