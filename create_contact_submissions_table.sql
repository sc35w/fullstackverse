-- SQL command to create the contact_submissions table in Supabase

CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  project_description TEXT NOT NULL,
  budget TEXT,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Add an index on email for faster queries
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

-- Optional: Add an index on type for filtering submissions
CREATE INDEX idx_contact_submissions_type ON contact_submissions(type);

-- Optional: Add an index on created_at for sorting
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);