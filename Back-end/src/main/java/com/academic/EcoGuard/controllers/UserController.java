package com.academic.EcoGuard.controllers;


import com.academic.EcoGuard.dtos.CTokenDto;
import com.academic.EcoGuard.dtos.OtpDto;
import com.academic.EcoGuard.dtos.UserDto;
import com.academic.EcoGuard.entities.User;
import com.academic.EcoGuard.services.ConfirmationTokenService;
import com.academic.EcoGuard.services.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@ResponseBody
@AllArgsConstructor
//@NoArgsConstructor
public class UserController {

    UserServiceImpl userService;
    ConfirmationTokenService tokenService;

//    public UserController(UserServiceImpl userService, ConfirmationTokenService tokenService) {
//        this.userService = userService;
//        this.tokenService = tokenService;
//    }

    @PostMapping
    ResponseEntity<UserDto> create(
//            @Valid
            @RequestBody UserDto dto)
    {
        dto=userService.create(dto);
        String id = dto.getId();
        tokenService.create(id);
        tokenService.sendMail(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/email/{email}")
    String otp(
            @PathVariable String email
    )
    {
        return tokenService.sendMail(email);

    }

    @PostMapping("/verify-otp")
    ResponseEntity<Boolean> auth(
            @RequestBody OtpDto dto
//            @RequestParam("id") String id,
//            @RequestParam("token")String token
            )
    {
        if(tokenService.confirm(dto.getUserId(),dto.getOtp()))
        {
            return ResponseEntity.ok(true);
        }

        return ResponseEntity.badRequest().body(false);
    }

    @PostMapping("/login")
    String login(
            @Valid
            @RequestBody UserDto dto)
    {
        return userService.login(dto.getUsername(),dto.getPassword());
    }

    @GetMapping
    ResponseEntity<Page<UserDto>> getAll(Pageable pageable)
    {
        return ResponseEntity.ok(userService.readAll(pageable));
    }

    @GetMapping("/{id}")
    ResponseEntity<UserDto> get(@PathVariable String id)
    {
        return ResponseEntity.ok(userService.read(id));
    }

//    @PostMapping("/verify-otp")
//    ResponseEntity<OtpDto> verifyOtp(@RequestBody OtpDto dto)
//    {
//
//    }

    @GetMapping("/search")
    ResponseEntity<Page<UserDto>> find(@RequestParam(name = "name") String name,Pageable pageable)
    {
        return ResponseEntity.ok(userService.find(name,pageable));
    }

    @PutMapping("/{id}")
    ResponseEntity<UserDto> update(@PathVariable("id") String id,
                                   @Valid
                                   @RequestBody UserDto dto)
    {
        return ResponseEntity.ok(userService.update(id,dto));
    }
    


}
