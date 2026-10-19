package com.example.app;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = { "http://localhost:4321", "http://localhost:8023" }) // Allow Astro frontend and Nginx proxy
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<List<CourseService.CourseWithRatingDTO>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @PostMapping("/{id}/rate")
    public ResponseEntity<Rating> rateCourse(
            @PathVariable UUID id,
            @RequestBody RateRequest request) {
        return ResponseEntity.ok(courseService.addRating(
                id,
                request.kathigitisScore(),
                request.fortwsMathimatosScore(),
                request.telikoScore(),
                request.dialexeisScore(),
                request.comment()));
    }

    public record RateRequest(int kathigitisScore, int fortwsMathimatosScore, int telikoScore, int dialexeisScore, String comment) {}
}
