# Profile & Theme API Contracts

_Last updated: 2025-10-09_

These contracts define the initial endpoints required for the Sprint 1 backend deliverables that power the user dashboard.

## Shared Conventions
- Base URL: `https://api.jangid.co.in`
- Versioning: Unversioned for MVP; promote to `/v1` when multiple clients exist.
- Auth: Bearer access token issued by `/auth/login` or `/auth/register` (see `Authorization: Bearer <token>` header).
- Content type: `application/json`
- Dates: ISO 8601 strings in UTC.
- Errors: JSON envelope `{ "statusCode": number, "message": string | string[], "error": string }`

## `GET /profiles/me`
Returns the authenticated user along with their profile, theme configuration, and publishing state.

### Response `200 OK`
```json
{
  "profile": {
    "id": "prf_123",
    "slug": "rakesh",
    "displayName": "Rakesh Sharma",
    "headline": "Master artisan of brass work",
    "summary": "Blending tradition with modern design to craft bespoke artefacts.",
    "status": "PENDING_REVIEW",
    "mode": "CARD",
    "themeId": "thm_classic_card",
    "themeConfig": {
      "palette": "warm",
      "accentColor": "#d97706"
    },
    "contact": {
      "email": "hello@rakeshcrafts.in",
      "phone": "+91-9876543210",
      "website": "https://rakeshcrafts.in",
      "address": "Jaipur, Rajasthan"
    },
    "services": [
      "Custom brass engraving",
      "Corporate gifting",
      "Traditional decor"
    ],
    "sections": {
      "gallery": [
        {
          "title": "Lotus Lamp",
          "imageUrl": "https://cdn.jangid.co.in/rakesh/lotus-lamp.jpg"
        }
      ],
      "testimonials": []
    },
    "metrics": {
      "views30d": 142,
      "enquiries30d": 5
    },
    "createdAt": "2025-09-21T07:18:31.000Z",
    "updatedAt": "2025-10-09T11:05:14.000Z"
  },
  "user": {
    "id": "usr_456",
    "email": "rakesh@jangid.co.in",
    "isApproved": false
  }
}
```

### Error Codes
- `401 Unauthorized` – missing or invalid token
- `404 Not Found` – profile absent (user hasn’t completed onboarding)

## `PATCH /profiles/me`
Updates profile content and theme configuration for the authenticated user. Partial updates supported; omitted properties remain unchanged.

### Request Body
```json
{
  "displayName": "Rakesh Sharma",
  "headline": "Master artisan of brass work",
  "summary": "Blending tradition with modern design.",
  "contact": {
    "email": "hello@rakeshcrafts.in",
    "phone": "+91-9876543210",
    "website": "https://rakeshcrafts.in",
    "address": "Jaipur, Rajasthan"
  },
  "services": [
    "Custom brass engraving",
    "Corporate gifting"
  ],
  "sections": {
    "gallery": [
      {
        "title": "Lotus Lamp",
        "imageUrl": "https://cdn.jangid.co.in/rakesh/lotus-lamp.jpg"
      }
    ]
  },
  "theme": {
    "themeId": "thm_classic_card",
    "config": {
      "palette": "warm",
      "accentColor": "#d97706"
    }
  }
}
```

### Validation Rules
- `displayName`: 2–80 chars.
- `headline`: optional, ≤120 chars.
- `summary`: optional, ≤600 chars.
- `services`: array of ≤12 items, each 2–80 chars.
- `contact.email`: optional, must be valid email.
- `contact.phone`: optional, ≤20 chars.
- `contact.website`: optional, valid URL.
- `theme.themeId`: required when `theme.config` provided; must match active theme slug.
- `sections`: JSON object validated against theme-specific schema (handled server-side via Zod).

### Response `200 OK`
Returns the updated `profile` payload identical to `GET /profiles/me`.

### Error Codes
- `400 Bad Request` – validation failure (e.g., invalid theme ID, sections schema mismatch)
- `401 Unauthorized` – missing or invalid token
- `409 Conflict` – attempting to change immutable fields (slug) or violate uniqueness

## `GET /themes`
Provides the catalog of available themes with configuration metadata for the dashboard selector.

### Query Parameters
- `status` (optional): `active` (default) | `all` – include inactive themes when set to `all`.

### Response `200 OK`
```json
{
  "themes": [
    {
      "id": "thm_classic_card",
      "name": "Classic Card",
      "slug": "classic-card",
      "description": "Elegant visiting-card layout with warm tones.",
      "thumbnail": "https://cdn.jangid.co.in/themes/classic-card.png",
      "configSchema": {
        "type": "object",
        "properties": {
          "palette": {
            "type": "string",
            "enum": ["warm", "cool", "neutral"],
            "default": "warm"
          },
          "accentColor": {
            "type": "string",
            "format": "color",
            "default": "#d97706"
          }
        },
        "required": ["palette"]
      }
    }
  ]
}
```

### Error Codes
- `401 Unauthorized` – token missing/invalid (endpoint requires auth for dashboard usage)

## Reserved Slugs
`['www', 'app', 'api', 'admin', 'dashboard', 'support', 'help', 'contact', 'jangid']`
- Attempting to register with a reserved slug MUST raise `409 Conflict` with message `"Subdomain is reserved"`.
- Existing users are grandfathered; migrations must ensure no reserved slug collisions.

## Open Items
- Decide whether analytics metrics are returned from `GET /profiles/me` immediately or via deferred endpoint.
- Determine if unauthenticated clients may fetch the theme catalog (public marketing page usage).
