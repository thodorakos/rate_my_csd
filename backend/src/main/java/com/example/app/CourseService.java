package com.example.app;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final RatingRepository ratingRepository;

    public List<CourseWithRatingDTO> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        List<Rating> allRatings = ratingRepository.findAll();

        Map<UUID, List<Rating>> ratingsByCourse = allRatings.stream()
                .collect(Collectors.groupingBy(r -> r.getCourse().getId()));

        return courses.stream().map(course -> {
            List<Rating> courseRatings = ratingsByCourse.getOrDefault(course.getId(), List.of());
                    double average = courseRatings.stream()
                        .mapToDouble(r -> (r.getKathigitisScore() + r.getFortwsMathimatosScore() + r.getTelikoScore() + r.getDialexeisScore()) / 4.0)
                    .average()
                    .orElse(0.0);
            return new CourseWithRatingDTO(course, average, courseRatings.size());
        }).collect(Collectors.toList());
    }

                    public Rating addRating(UUID courseId, int kathigitisScore, int fortwsMathimatosScore, int telikoScore, int dialexeisScore, String comment) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

                    int overallScore = (int) Math.round(
                        (kathigitisScore + fortwsMathimatosScore + telikoScore + dialexeisScore) / 4.0
                    );
        
        Rating rating = Rating.builder()
                .course(course)
                .kathigitisScore(kathigitisScore)
                .fortwsMathimatosScore(fortwsMathimatosScore)
                .telikoScore(telikoScore)
                    .dialexeisScore(dialexeisScore)
                        .score(overallScore)
                .comment(comment)
                .build();
        
        return ratingRepository.save(rating);
    }
    
    public record CourseWithRatingDTO(Course course, double averageRating, int reviewCount) {}
}
