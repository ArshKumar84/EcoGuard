package com.academic.EcoGuard.services;

import com.academic.EcoGuard.dtos.CTokenDto;
import com.academic.EcoGuard.dtos.OtpDto;
import com.academic.EcoGuard.entities.CToken;
import com.academic.EcoGuard.entities.User;
import com.academic.EcoGuard.exceptionsHandler.InvalidParametersException;
import com.academic.EcoGuard.exceptionsHandler.ResourceNotFoundException;
import com.academic.EcoGuard.repositories.CTokenRepo;
import com.academic.EcoGuard.repositories.UserRepo;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service

public class ConfirmationTokenService {
    

    private UserRepo userRepo;
    private CTokenRepo cRepo;
    private ModelMapper mapper;
    private JavaMailSender mailSender;


    public ConfirmationTokenService(UserRepo userRepo, CTokenRepo cRepo, ModelMapper mapper, JavaMailSender mailSender) {
        this.userRepo = userRepo;
        this.cRepo = cRepo;
        this.mapper = mapper;
        this.mailSender = mailSender;
    }

    //create
    public CTokenDto create(String userId)
    {
        String tokenId =randomToken(5);
        CToken token = new CToken(tokenId);
        User user = userRepo.findById(userId).orElseThrow(
                ()->new ResourceNotFoundException("User Not Found")
        );
        token.setUser(user);
        user.setToken(token);
        token = cRepo.save(token);
        return mapper.map(token,CTokenDto.class);
    }

    public String randomToken(int length)
    {
        String seq = "0123456789";
        StringBuilder token= new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < length; i++) {


            token.append(seq.charAt(random.nextInt(length)));
        }

        return token.toString();

    }

    public String sendMail(String id)
    {
        User user=userRepo.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("User Not Found")
        );

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Confirmation your email");
        message.setText(user.getUsername() + " The confirmation code for sign up with EcoGuard is : "+ user.getToken().getToken());

        mailSender.send(message);

        return user.getToken().getToken();

    }



    public Boolean confirm(String id, String token)
    {
       String userToken  = userRepo.findById(id)
                .orElseThrow(
                    ()-> 
                     new InvalidParametersException("Wrong Token")
                ).getToken().getToken();


         if( userToken.equals(token))
         {
             return true;
         }

         return false;
                
    }

}
