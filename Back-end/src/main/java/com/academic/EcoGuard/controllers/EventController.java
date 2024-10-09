package com.academic.EcoGuard.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.academic.EcoGuard.dtos.DonationDto;
import com.academic.EcoGuard.exceptionsHandler.InvalidParametersException;
import com.academic.EcoGuard.services.DonationServiceImpl;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/events")
@ResponseBody
@CrossOrigin(origins = "https://eco-guard-ten.vercel.app")
public class EventController {
}
