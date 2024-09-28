package com.academic.EcoGuard.services;

import com.academic.EcoGuard.dtos.CardDto;
import com.academic.EcoGuard.dtos.DonationDto;
import com.academic.EcoGuard.entities.Donation;
import com.academic.EcoGuard.entities.User;
import com.academic.EcoGuard.exceptionsHandler.ResourceNotFoundException;
import com.academic.EcoGuard.repositories.DonationRepo;
import com.academic.EcoGuard.repositories.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationServiceImpl implements DonationService{

    DonationRepo donationRepo;
    UserRepo userRepo;
    ModelMapper mapper;

    public DonationServiceImpl(DonationRepo donationRepo, UserRepo userRepo, ModelMapper mapper) {
        this.donationRepo = donationRepo;
        this.userRepo = userRepo;
        this.mapper = mapper;
    }

    @Override
    public DonationDto createCard(String id, CardDto dto,int amount) {
        User user=userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        Donation donation=new Donation();
        donation.setId(id);
        donation.setDto(dto);
        donation.setAmount(amount);
        donation.getUserList().add(user);

        donation= donationRepo.save(donation);
        user.setNumTrees(user.getNumTrees()+amount/50);
        return mapper.map(donation, DonationDto.class);
    }

    @Override
    public DonationDto createUpi(String id, String upi,int amount) {
        Donation donation=new Donation();
        donation.setId(id);
        donation.setUpi(upi);
        donation.setAmount(amount);

        donation= donationRepo.save(donation);
        return mapper.map(donation, DonationDto.class);
    }

    @Override
    public Page<DonationDto> readAll(String id, Pageable pageable) {
        User user = userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        List<Donation> donationList= user.getDonationList();
        List<DonationDto> donationDtoList = donationList.stream().map(
                donation -> mapper.map(donation,DonationDto.class)
        ).toList();

        return new PageImpl<>(donationDtoList,pageable,donationList.size());
    }
}
