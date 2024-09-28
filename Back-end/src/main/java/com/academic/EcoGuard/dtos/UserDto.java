package com.academic.EcoGuard.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.modelmapper.internal.bytebuddy.asm.Advice;
import org.springframework.web.bind.annotation.CrossOrigin;


@Getter
@Setter
@Data
@NoArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserDto {

    private String id;

    @NotBlank
    @Pattern(regexp = "^[\\S]+$", message = "Username should not contain spaces")
    private String username;

//    @NotBlank
    private String location;

    @Email
    private String email;

    @NotBlank
    private String password;

    private long numTrees;

    public UserDto(String id, String username, String location, String email, String password, long numTrees) {
        this.id = id;
        this.username = username;
        this.location = location;
        this.email = email;
        this.password = password;
        this.numTrees = numTrees;
    }

    public @NotBlank String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank String username) {
        this.username = username;
    }


//    public @NotBlank String getLocation() {
//        return location;
//    }
//
//    public void setLocation(@NotBlank String location) {
//        this.location = location;
//    }

    public @NotBlank String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank String password) {
        this.password = password;
    }


    @Override
    public String toString() {
        return "UserDto{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", location='" + location + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", numTrees=" + numTrees +
                '}';
    }


}
