package com.academic.EcoGuard.dtos;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

public class PostDto {

    @Setter
    @Getter
    private String id;

    @Length(max = 500)
    @NotBlank
    private String data;

    @Setter
    @Getter
    private long likes;

    public PostDto(String id, String data, long likes) {
        this.id = id;
        this.data = data;
        this.likes = likes;
    }

    public @Length(max = 500) @NotBlank String getData() {
        return data;
    }

    public void setData(@Length(max = 500) @NotBlank String data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "PostDto{" +
                "id='" + id + '\'' +
                ", data='" + data + '\'' +
                ", likes=" + likes +
                '}';
    }


}
