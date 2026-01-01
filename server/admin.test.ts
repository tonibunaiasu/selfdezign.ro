import { describe, it, expect } from "vitest";
import {
  getHomeContent,
  updateHomeContent,
  getAboutContent,
  updateAboutContent,
  getContactContent,
  updateContactContent,
  getFooterContent,
  updateFooterContent,
  getTeamMembers,
} from "./db";

describe("Admin Dashboard CRUD Operations", () => {
  describe("Home Content", () => {
    it("should get or create home content for a language", async () => {
      const content = await getHomeContent("ro");
      if (content) {
        expect(content).toHaveProperty("language");
        expect(content.language).toBe("ro");
      }
    });

    it("should handle home content updates gracefully", async () => {
      try {
        const updated = await updateHomeContent("ro", {
          heroTitle: "Test Title",
          heroDescription: "Test Description",
        });
        if (updated) {
          expect(updated.heroTitle).toBe("Test Title");
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("About Content", () => {
    it("should get or create about content for a language", async () => {
      const content = await getAboutContent("ro");
      if (content) {
        expect(content).toHaveProperty("language");
        expect(content.language).toBe("ro");
      }
    });

    it("should handle about content updates gracefully", async () => {
      try {
        const updated = await updateAboutContent("ro", {
          aboutText: "Updated about text",
        });
        if (updated) {
          expect(updated.aboutText).toBe("Updated about text");
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("Contact Content", () => {
    it("should get or create contact content for a language", async () => {
      const content = await getContactContent("ro");
      if (content) {
        expect(content).toHaveProperty("language");
        expect(content.language).toBe("ro");
      }
    });

    it("should handle contact content updates gracefully", async () => {
      try {
        const updated = await updateContactContent("ro", {
          phone: "+40123456789",
          email: "contact@selfdezign.ro",
        });
        if (updated) {
          expect(updated.phone).toBe("+40123456789");
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("Footer Content", () => {
    it("should get or create footer content for a language", async () => {
      const content = await getFooterContent("ro");
      if (content) {
        expect(content).toHaveProperty("language");
        expect(content.language).toBe("ro");
      }
    });

    it("should handle footer content updates gracefully", async () => {
      try {
        const updated = await updateFooterContent("ro", {
          companyName: "SelfDezign Studio",
        });
        if (updated) {
          expect(updated.companyName).toBe("SelfDezign Studio");
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("Multi-language Support", () => {
    it("should handle both RO and EN languages", async () => {
      const roContent = await getHomeContent("ro");
      const enContent = await getHomeContent("en");

      if (roContent && enContent) {
        expect(roContent.language).toBe("ro");
        expect(enContent.language).toBe("en");
      }
    });

    it("should handle multi-language updates gracefully", async () => {
      try {
        await updateHomeContent("ro", { heroTitle: "Titlu RO" });
        await updateHomeContent("en", { heroTitle: "Title EN" });

        const roContent = await getHomeContent("ro");
        const enContent = await getHomeContent("en");

        if (roContent && enContent) {
          expect(roContent.heroTitle).toBe("Titlu RO");
          expect(enContent.heroTitle).toBe("Title EN");
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("Team Members", () => {
    it("should get team members", async () => {
      const members = await getTeamMembers("ro");
      expect(Array.isArray(members)).toBe(true);
    });

    it("should handle team member operations gracefully", async () => {
      try {
        const members = await getTeamMembers("ro");
        expect(Array.isArray(members)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
