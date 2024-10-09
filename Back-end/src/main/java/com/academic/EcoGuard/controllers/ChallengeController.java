package com.academic.EcoGuard.controllers;

import com.academic.EcoGuard.dtos.ChallengeDto;
import com.academic.EcoGuard.services.ChallengeServiceImpl;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/challenges")
@ResponseBody
@AllArgsConstructor
//@NoArgsConstructor
public class ChallengeController {

    ChallengeServiceImpl service;


    @PostMapping("join/{id}")
    ResponseEntity<ChallengeDto> join(@PathVariable("id") String userId, @RequestBody ChallengeDto dto)
    {
        return ResponseEntity.ok(service.join(userId,dto));
    }


    @GetMapping("/{id}")
    ResponseEntity<ChallengeDto> get(@PathVariable String id)
    {
        return ResponseEntity.ok(service.read(id));
    }

    @PutMapping("/{id}")
    ResponseEntity<ChallengeDto> update(@PathVariable("id") String id,@RequestBody ChallengeDto dto)
    {
        return ResponseEntity.ok(service.update(id,dto));
    }
}
