package com.academic.EcoGuard.controllers;


import com.academic.EcoGuard.dtos.DonationDto;
import com.academic.EcoGuard.exceptionsHandler.InvalidParametersException;
import com.academic.EcoGuard.services.DonationServiceImpl;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/donations")
@ResponseBody

public class DonationController {

    DonationServiceImpl service;

    @PostMapping
    public DonationDto create(@RequestBody DonationDto dto)
    {
        if (dto.getDto() != null)
        {
            return service.createCard(dto.getId(), dto.getDto(), dto.getAmount());
        }
        else if (dto.getUpi() != null)
        {
            return service.createUpi(dto.getId(), dto.getUpi(), dto.getAmount());
        }
        throw new InvalidParametersException("Details not found");
    }

    @GetMapping
    public Page<DonationDto> readAll(String id,Pageable pageable)
    {
        return service.readAll(id, pageable);
    }

}
