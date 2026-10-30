import { describe, it, expect } from "vitest";
import { PATIENT_REVIEWS, GOOGLE_RATING_SUMMARY } from "../patient-reviews";

describe("Patient Reviews & Google Rating Configuration", () => {
  it("should contain at least 10 authentic patient reviews", () => {
    expect(PATIENT_REVIEWS.length).toBeGreaterThanOrEqual(10);
  });

  it("should have valid ratings, patient names, and services", () => {
    for (const rev of PATIENT_REVIEWS) {
      expect(rev.id).toBeTruthy();
      expect(rev.name.length).toBeGreaterThan(2);
      expect(rev.locality.length).toBeGreaterThan(2);
      expect(rev.service.length).toBeGreaterThan(2);
      expect(rev.rating).toBe(5);
      expect(rev.text.length).toBeGreaterThan(20);
      expect(["all", "mri-ct", "pet-ct", "pathology", "health-package", "video"]).toContain(
        rev.category
      );
      expect(rev.verified).toBe(true);
    }
  });

  it("should have video URLs for video testimonials", () => {
    const videoReviews = PATIENT_REVIEWS.filter((r) => r.category === "video");
    expect(videoReviews.length).toBeGreaterThan(0);

    for (const v of videoReviews) {
      expect(v.videoThumbnail).toBeTruthy();
      expect(v.videoUrl).toBeTruthy();
      expect(v.videoDuration).toBeTruthy();
    }
  });

  it("should provide valid Google rating summary metrics", () => {
    expect(GOOGLE_RATING_SUMMARY.rating).toBe("4.9");
    expect(GOOGLE_RATING_SUMMARY.totalReviews).toBeTruthy();
    expect(GOOGLE_RATING_SUMMARY.onTimeReports).toBeTruthy();
  });
});
