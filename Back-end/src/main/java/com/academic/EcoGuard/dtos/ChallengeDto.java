package com.academic.EcoGuard.dtos;


import lombok.Getter;

@Getter
public class ChallengeDto {

    private String id;

    private int goal;

    private int numTrees;

    public ChallengeDto(String id, int goal, int numTrees) {
        this.id = id;
        this.goal = goal;
        this.numTrees = numTrees;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setGoal(int goal) {
        this.goal = goal;
    }

    public void setNumTrees(int numTrees) {
        this.numTrees = numTrees;
    }

    @Override
    public String toString() {
        return "ChallengeDto{" +
                "id='" + id + '\'' +
                ", goal=" + goal +
                ", numTrees=" + numTrees +
                '}';
    }
}
