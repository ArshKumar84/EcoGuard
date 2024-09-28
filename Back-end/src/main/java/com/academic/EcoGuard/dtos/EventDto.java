package com.academic.EcoGuard.dtos;

import com.academic.EcoGuard.entities.User;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

import java.util.Date;

public class EventDto {

    private String id;

    private Date date;

    private String Location;

    private int goal;

}
