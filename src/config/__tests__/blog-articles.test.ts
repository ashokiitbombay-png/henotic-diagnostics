import { describe, it, expect } from "vitest";
import {
  STATIC_BLOG_ARTICLES,
  getStaticBlogArticles,
  getStaticBlogArticle,
} from "../blog-articles";
import { DOCTORS } from "../doctors";
import { services } from "../services";

describe("Static Clinical Blog Articles", () => {
  it("should contain at least 8 authoritative clinical guides", () => {
    expect(STATIC_BLOG_ARTICLES.length).toBeGreaterThanOrEqual(8);
  });

  it("should have unique, valid kebab-case slugs", () => {
    const slugs = STATIC_BLOG_ARTICLES.map((a) => a.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);

    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
      expect(slug).not.toMatch(/^-|-$/);
    }
  });

  it("should have comprehensive content and metadata for each article", () => {
    for (const article of STATIC_BLOG_ARTICLES) {
      expect(article.id).toBeDefined();
      expect(article.title.length).toBeGreaterThan(10);
      expect(article.excerpt.length).toBeGreaterThan(30);
      expect(article.content.length).toBeGreaterThan(500);
      expect(article.readingTimeMinutes).toBeGreaterThan(0);
      expect(article.featuredImage?.node?.sourceUrl).toMatch(/^https?:\/\//);
      expect(article.categories.nodes.length).toBeGreaterThan(0);
      expect(article.tags.nodes.length).toBeGreaterThan(0);
      expect(article.medicalSpecialty).toBeDefined();

      // Verify date formatting
      expect(() => new Date(article.date).toISOString()).not.toThrow();
      expect(() => new Date(article.modified).toISOString()).not.toThrow();
    }
  });

  it("should link to real, verified doctors in the medical faculty", () => {
    const doctorIds = new Set(DOCTORS.map((d) => d.id));

    for (const article of STATIC_BLOG_ARTICLES) {
      expect(article.author.node.name).toBeTruthy();
      if (article.author.node.doctorSlug) {
        expect(doctorIds.has(article.author.node.doctorSlug)).toBe(true);
      }
      if (article.reviewedBy?.doctorSlug) {
        expect(doctorIds.has(article.reviewedBy.doctorSlug)).toBe(true);
      }
    }
  });

  it("should reference valid services when relatedServiceSlug is provided", () => {
    const serviceSet = new Set(services);
    for (const article of STATIC_BLOG_ARTICLES) {
      if (article.relatedServiceSlug) {
        expect(serviceSet.has(article.relatedServiceSlug)).toBe(true);
      }
    }
  });

  it("should retrieve articles correctly by slug", () => {
    const firstArticle = STATIC_BLOG_ARTICLES[0];
    const retrieved = getStaticBlogArticle(firstArticle.slug);
    expect(retrieved).toBeDefined();
    expect(retrieved?.title).toBe(firstArticle.title);

    const nonExistent = getStaticBlogArticle("non-existent-medical-article-123");
    expect(nonExistent).toBeUndefined();
  });

  it("getStaticBlogArticles should return the full list", () => {
    const all = getStaticBlogArticles();
    expect(all).toEqual(STATIC_BLOG_ARTICLES);
  });
});
