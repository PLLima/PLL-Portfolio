# pllima.com - Cloudinary Asset & Folder Structure

**Root Folder:** `portfolio/`

```text
portfolio/
├── images/
│   ├── profile/
│   │   ├── profile-photo-default.jpg
│   │   ├── profile-photo-suit-2024.jpg
│   │   └── profile-photo-casual.jpg
│   │
│   └── seo/
│       ├── og-image-default.jpg
│       └── og-image-dark-mode.jpg
│
├── resumes/
│   ├── en/
│   │   └── [Pattern: yyyy-mm-dd_hh-min-ss_role_company_language_resume.pdf]
│   │       (e.g., 2024-05-30_17-52-06_it-consultant_amazon_en_resume.pdf)
│   │
│   ├── pt-br/
│   │   └── [Pattern: yyyy-mm-dd_hh-min-ss_role_company_language_resume.pdf]
│   │       (e.g., 2024-05-30_17-52-06_it-consultant_amazon_pt-br_resume.pdf)
│   │
│   └── fr/
│       └── [Pattern: yyyy-mm-dd_hh-min-ss_role_company_language_resume.pdf]
│           (e.g., 2024-05-30_17-52-06_it-consultant_amazon_fr_resume.pdf)
│
└── cover-letters/
    ├── en/
    │   └── [Pattern: yyyy-mm-dd_hh-min-ss_role_company_language_cover-letter.pdf]
    │       (e.g., 2024-05-30_17-52-06_it-consultant_amazon_en_cover-letter.pdf)
    │
    ├── pt-br/
    │   └── [Pattern: yyyy-mm-dd_hh-min-ss_role_company_language_cover-letter.pdf]
    │       (e.g., 2024-05-30_17-52-06_it-consultant_amazon_pt-br_cover-letter.pdf)
    │
    └── fr/
        └── [Pattern: yyyy-mm-dd_hh-min-ss_role_company_language_cover-letter.pdf]
            (e.g., 2024-05-30_17-52-06_it-consultant_amazon_fr_cover-letter.pdf)
```

## Notes:
- Resumes and Cover Letters are uploaded to Cloudinary using `resource_type="raw"` to ensure direct PDF downloads.
- Timestamps use a 24-hour format (`hh-min-ss`) to guarantee unique chronological sorting.
