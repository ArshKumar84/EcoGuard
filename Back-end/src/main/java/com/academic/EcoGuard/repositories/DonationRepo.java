package com.academic.EcoGuard.repositories;

import com.academic.EcoGuard.entities.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepo extends JpaRepository<Donation,String> {
}
