package com.academic.EcoGuard.services;

import com.academic.EcoGuard.dtos.CardDto;
import com.academic.EcoGuard.dtos.DonationDto;
import com.academic.EcoGuard.entities.Donation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DonationService {

    //createCard
    public DonationDto createCard(String id, CardDto dto,int amount);

    //createUpi
    public DonationDto createUpi(String id,String upi,int amount);

    //readAll
    public Page<DonationDto> readAll(String id, Pageable pageable);
}
