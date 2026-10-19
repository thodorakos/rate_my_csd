package com.example.app;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "ratings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(nullable = false)
    private int kathigitisScore; // 1-5

    @Column(nullable = false)
    private int fortwsMathimatosScore; // 1-5

    @Column(nullable = false)
    private int telikoScore; // 1-5

    @Column(nullable = false)
    private int dialexeisScore; // 1-5

    @Column(nullable = false)
    private int score; // overall score (1-5)

    @Column(length = 1000)
    private String comment;

    @CreationTimestamp
    private LocalDateTime timestamp;
}
