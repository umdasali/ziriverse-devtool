export type SchemaType = "Article" | "Product" | "FAQ" | "Organization" | "LocalBusiness" | "BreadcrumbList" | "WebSite";

export interface SchemaField {
  key: string;
  label: string;
  type: "text" | "url" | "number" | "date" | "textarea";
  required?: boolean;
  placeholder?: string;
}

export const schemaTemplates: Record<SchemaType, { fields: SchemaField[]; description: string }> = {
  Article: {
    description: "Blog posts, news articles, and other written content",
    fields: [
      { key: "headline", label: "Headline", type: "text", required: true, placeholder: "Article title" },
      { key: "description", label: "Description", type: "textarea", required: true, placeholder: "Brief description" },
      { key: "image", label: "Image URL", type: "url", placeholder: "https://example.com/image.jpg" },
      { key: "authorName", label: "Author Name", type: "text", required: true, placeholder: "John Doe" },
      { key: "publisherName", label: "Publisher Name", type: "text", placeholder: "My Blog" },
      { key: "publisherLogo", label: "Publisher Logo URL", type: "url", placeholder: "https://example.com/logo.png" },
      { key: "datePublished", label: "Date Published", type: "date", required: true },
      { key: "dateModified", label: "Date Modified", type: "date" },
      { key: "url", label: "Article URL", type: "url", placeholder: "https://example.com/article" },
    ],
  },
  Product: {
    description: "Physical or digital products for e-commerce",
    fields: [
      { key: "name", label: "Product Name", type: "text", required: true, placeholder: "Product name" },
      { key: "description", label: "Description", type: "textarea", required: true, placeholder: "Product description" },
      { key: "image", label: "Image URL", type: "url", placeholder: "https://example.com/product.jpg" },
      { key: "brand", label: "Brand", type: "text", placeholder: "Brand name" },
      { key: "sku", label: "SKU", type: "text", placeholder: "SKU-12345" },
      { key: "price", label: "Price", type: "number", required: true, placeholder: "29.99" },
      { key: "currency", label: "Currency", type: "text", required: true, placeholder: "USD" },
      { key: "availability", label: "Availability", type: "text", placeholder: "InStock" },
      { key: "url", label: "Product URL", type: "url", placeholder: "https://example.com/product" },
    ],
  },
  FAQ: {
    description: "Frequently asked questions page",
    fields: [
      { key: "q1", label: "Question 1", type: "text", required: true, placeholder: "What is...?" },
      { key: "a1", label: "Answer 1", type: "textarea", required: true, placeholder: "Answer to question 1" },
      { key: "q2", label: "Question 2", type: "text", placeholder: "How do I...?" },
      { key: "a2", label: "Answer 2", type: "textarea", placeholder: "Answer to question 2" },
      { key: "q3", label: "Question 3", type: "text", placeholder: "Why is...?" },
      { key: "a3", label: "Answer 3", type: "textarea", placeholder: "Answer to question 3" },
    ],
  },
  Organization: {
    description: "Company or organization information",
    fields: [
      { key: "name", label: "Organization Name", type: "text", required: true, placeholder: "Company Inc." },
      { key: "description", label: "Description", type: "textarea", placeholder: "About the organization" },
      { key: "url", label: "Website URL", type: "url", required: true, placeholder: "https://example.com" },
      { key: "logo", label: "Logo URL", type: "url", placeholder: "https://example.com/logo.png" },
      { key: "email", label: "Email", type: "text", placeholder: "info@example.com" },
      { key: "phone", label: "Phone", type: "text", placeholder: "+1-555-0100" },
      { key: "address", label: "Address", type: "text", placeholder: "123 Main St, City, State" },
    ],
  },
  LocalBusiness: {
    description: "Local businesses with physical locations",
    fields: [
      { key: "name", label: "Business Name", type: "text", required: true, placeholder: "My Business" },
      { key: "description", label: "Description", type: "textarea", placeholder: "About the business" },
      { key: "url", label: "Website URL", type: "url", placeholder: "https://example.com" },
      { key: "image", label: "Image URL", type: "url", placeholder: "https://example.com/image.jpg" },
      { key: "phone", label: "Phone", type: "text", required: true, placeholder: "+1-555-0100" },
      { key: "address", label: "Street Address", type: "text", required: true, placeholder: "123 Main St" },
      { key: "city", label: "City", type: "text", required: true, placeholder: "Springfield" },
      { key: "state", label: "State/Region", type: "text", placeholder: "IL" },
      { key: "postalCode", label: "Postal Code", type: "text", placeholder: "62701" },
      { key: "country", label: "Country", type: "text", placeholder: "US" },
      { key: "priceRange", label: "Price Range", type: "text", placeholder: "$$" },
    ],
  },
  BreadcrumbList: {
    description: "Navigation breadcrumb trail",
    fields: [
      { key: "item1Name", label: "Item 1 Name", type: "text", required: true, placeholder: "Home" },
      { key: "item1Url", label: "Item 1 URL", type: "url", required: true, placeholder: "https://example.com/" },
      { key: "item2Name", label: "Item 2 Name", type: "text", placeholder: "Category" },
      { key: "item2Url", label: "Item 2 URL", type: "url", placeholder: "https://example.com/category" },
      { key: "item3Name", label: "Item 3 Name", type: "text", placeholder: "Page" },
      { key: "item3Url", label: "Item 3 URL", type: "url", placeholder: "https://example.com/category/page" },
    ],
  },
  WebSite: {
    description: "Website with sitelinks search box",
    fields: [
      { key: "name", label: "Website Name", type: "text", required: true, placeholder: "My Website" },
      { key: "url", label: "Website URL", type: "url", required: true, placeholder: "https://example.com" },
      { key: "searchUrl", label: "Search URL Template", type: "url", placeholder: "https://example.com/search?q={search_term_string}" },
    ],
  },
};

export function generateSchema(type: SchemaType, values: Record<string, string>): string {
  let schema: Record<string, unknown>;

  switch (type) {
    case "Article":
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: values.headline,
        description: values.description,
        image: values.image || undefined,
        author: { "@type": "Person", name: values.authorName },
        publisher: values.publisherName
          ? { "@type": "Organization", name: values.publisherName, logo: values.publisherLogo ? { "@type": "ImageObject", url: values.publisherLogo } : undefined }
          : undefined,
        datePublished: values.datePublished,
        dateModified: values.dateModified || undefined,
        url: values.url || undefined,
      };
      break;

    case "Product":
      schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: values.name,
        description: values.description,
        image: values.image || undefined,
        brand: values.brand ? { "@type": "Brand", name: values.brand } : undefined,
        sku: values.sku || undefined,
        offers: {
          "@type": "Offer",
          price: values.price,
          priceCurrency: values.currency || "USD",
          availability: values.availability ? `https://schema.org/${values.availability}` : undefined,
          url: values.url || undefined,
        },
      };
      break;

    case "FAQ": {
      const questions: { "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }[] = [];
      for (let i = 1; i <= 3; i++) {
        if (values[`q${i}`] && values[`a${i}`]) {
          questions.push({
            "@type": "Question",
            name: values[`q${i}`],
            acceptedAnswer: { "@type": "Answer", text: values[`a${i}`] },
          });
        }
      }
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions,
      };
      break;
    }

    case "Organization":
      schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: values.name,
        description: values.description || undefined,
        url: values.url,
        logo: values.logo || undefined,
        email: values.email || undefined,
        telephone: values.phone || undefined,
        address: values.address ? { "@type": "PostalAddress", streetAddress: values.address } : undefined,
      };
      break;

    case "LocalBusiness":
      schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: values.name,
        description: values.description || undefined,
        url: values.url || undefined,
        image: values.image || undefined,
        telephone: values.phone,
        priceRange: values.priceRange || undefined,
        address: {
          "@type": "PostalAddress",
          streetAddress: values.address,
          addressLocality: values.city,
          addressRegion: values.state || undefined,
          postalCode: values.postalCode || undefined,
          addressCountry: values.country || undefined,
        },
      };
      break;

    case "BreadcrumbList": {
      const items: { "@type": string; position: number; name: string; item?: string }[] = [];
      for (let i = 1; i <= 3; i++) {
        if (values[`item${i}Name`]) {
          items.push({
            "@type": "ListItem",
            position: i,
            name: values[`item${i}Name`],
            item: values[`item${i}Url`] || undefined,
          });
        }
      }
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
      };
      break;
    }

    case "WebSite":
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: values.name,
        url: values.url,
        potentialAction: values.searchUrl
          ? {
              "@type": "SearchAction",
              target: { "@type": "EntryPoint", urlTemplate: values.searchUrl },
              "query-input": "required name=search_term_string",
            }
          : undefined,
      };
      break;

    default:
      schema = {};
  }

  return JSON.stringify(removeUndefined(schema), null, 2);
}

function removeUndefined(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(removeUndefined);
  if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, removeUndefined(v)])
    );
  }
  return obj;
}
