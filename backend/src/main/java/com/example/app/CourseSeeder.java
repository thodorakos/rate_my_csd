package com.example.app;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CourseSeeder implements CommandLineRunner {

    private final CourseRepository courseRepository;

    @Override
    public void run(String... args) throws Exception {
        if (courseRepository.count() > 0) {
            return;
        }

        Map<String, List<String>> catalog = new HashMap<>();

        catalog.put("CORE", List.of(
            "HY-100, Εισαγωγή στην Επιστήμη των Υπολογιστών, 8",
            "HY-108, Αγγλικά I, 4",
            "HY-109, Αγγλικά II, 4",
            "HY-110, Απειροστικός Λογισμός Ι, 8",
            "HY-118, Διακριτά Μαθηματικά, 6",
            "HY-119, Γραμμική Άλγεβρα, 6",
            "HY-120, Ψηφιακή Σχεδίαση, 8",
            "HY-150, Προγραμματισμός, 8",
            "HY-180, Λογική, 6",
            "HY-208, Αγγλικά III, 4",
            "HY-209, Αγγλικά IV, 4",
            "HY-215, Εφαρμοσμένα Μαθηματικά για Μηχανικούς, 8",
            "HY-217, Πιθανότητες, 6",
            "HY-225, Οργάνωση Υπολογιστών, 8",
            "HY-240, Δομές Δεδομένων, 8",
            "HY-252, Αντικειμενοστρεφής Προγραμματισμός, 8",
            "HY-255, Εργαστήριο Λογισμικού, 6",
            "HY-280, Θεωρία Υπολογισμού, 6",
            "HY-335, Δίκτυα Υπολογιστών, 6",
            "HY-340, Γλώσσες και Μεταφραστές, 8",
            "HY-345, Λειτουργικά Συστήματα, 8",
            "HY-360, Αρχεία και Βάσεις Δεδομένων, 8",
            "HY-380, Αλγόριθμοι και Πολυπλοκότητα, 8",
            "HY-498, Διπλωματική Εργασία, 18"
        ));

        catalog.put("ELECTIVES_MATH_PHYSICS", List.of(
            "EΜY-401, Οπτική και Κύματα, 5",
            "HY-111, Απειροστικός Λογισμός ΙI, 6",
            "HY-112, Φυσική I, 8",
            "ΗΥ-113, Φυσική ΙΙ, 6",
            "ΗΥ-121, Ηλεκτρικά Κυκλώματα, 6",
            "ΗΥ-122, Εισαγωγή στην Ηλεκτρονική, 6"
        ));

        catalog.put("HARDWARE", List.of(
            "HY-220, Εργαστήριο Ψηφιακών Κυκλωμάτων, 6",
            "HY-422, Εισαγωγή στα Συστήματα VLSI, 6"
        ));

        catalog.put("SYSTEMS", List.of(
            "HY-342, Παράλληλος Προγραμματισμός, 6",
            "HY-425, Αρχιτεκτονική Υπολογιστικών Συστημάτων, 6",
            "HY-428, Εργαστήριο Ενσωματωμένων Συστημάτων, 6"
        ));

        catalog.put("SECURITY", List.of(
            "HY-455, Εργαστήριο Διαδικτυακών Επιθέσεων, 6",
            "HY-457, Εισαγωγή στα Συστήματα Ασφάλειας, 6",
            "HY-457.1, Ψηφιακή Εγκληματολογία, 6",
            "HY-458, Εισαγωγή στην Κρυπτογραφία, 6"
        ));

        catalog.put("NETWORKS", List.of(
            "HY-330, Θεωρία Τηλεπικοινωνιακών Συστημάτων, 6",
            "HY-435, Εργαστήριο Δικτύων Ι, 6",
            "HY-436, Software Defined Networks, 6",
            "HY-439, Κινητά Υπολογιστικά Συστήματα, 6",
            "HY-459, Εργαστήριο Μετρήσεων Διαδικτύου, 6"
        ));

        catalog.put("ALGORITHMS", List.of(
            "HY-468, Θεωρία Παιγνίων, 6",
            "HY-484, Δυναμική Πολύπλοκων Δικτύων, 6",
            "HY-486, Αρχές Κατανεμημένου Υπολογισμού, 6"
        ));

        catalog.put("DATA", List.of(
            "HY-351, Ανάλυση Πληροφοριακών Συστημάτων, 6",
            "HY-452, Τεχνολογία Υπηρεσιών, 6",
            "HY-460, Βάσεις Δεδομένων (DBMS), 6",
            "HY-463, Ανάκτησης Πληροφοριών, 6"
        ));

        catalog.put("SOFTWARE_ENG", List.of(
            "HY-352, Τεχνολογία Λογισμικού, 6",
            "HY-359, Διαδικτυοκεντρικός Προγραμματισμός, 6",
            "HY-446, Συστήματα Εκτέλεσης Δυναμικών Γλωσσών, 6"
        ));

        catalog.put("AI", List.of(
            "HY-473, Αναγνώριση Προτύπων, 6",
            "HY-485, Επιστήμη Δεδομένων, 6",
            "HY-487, Εισαγωγή στην Τεχνητή Νοημοσύνη, 6"
        ));

        catalog.put("SIGNAL", List.of(
            "HY-317, Στοχαστικές Διαδικασίες, 6",
            "HY-370, Ψηφιακή Επεξεργασία Σημάτων, 6",
            "HY-474, Τεχνολογία Πολυμέσων, 6"
        ));

        catalog.put("VISION_ROBOTICS", List.of(
            "HY-371, Επεξεργασία Εικόνων, 6",
            "HY-471, Ανάλυση Εικόνων, 6",
            "HY-472, Υπολογιστική Όραση, 6",
            "HY-475, Αυτόνομη Ρομποτική Πλοήγηση, 6"
        ));

        catalog.put("GRAPHICS", List.of(
            "HY-358, Γραφική, 6",
            "HY-364, HCI, 6",
            "HY-454, Έξυπνες Διεπαφές & Παιχνίδια, 6",
            "HY-469, Σύγχρονα Θέματα HCI, 6"
        ));

        catalog.put("BIO", List.of(
            "HY-482, Αλγόριθμοι στη Βιοπληροφορική, 6"
        ));

        for (Map.Entry<String, List<String>> entry : catalog.entrySet()) {
            String category = entry.getKey();
            for (String rawCourse : entry.getValue()) {
                String[] parts = rawCourse.split(",");
                if (parts.length >= 3) {
                    String code = parts[0].trim();
                    String title = parts[1].trim();
                    int ects = Integer.parseInt(parts[2].trim());

                    if (!courseRepository.existsByCode(code)) {
                        Course course = Course.builder()
                                .code(code)
                                .title(title)
                                .ects(ects)
                                .category(category)
                                .build();
                        courseRepository.save(course);
                    }
                }
            }
        }
        System.out.println("Seeding complete.");
    }
}
