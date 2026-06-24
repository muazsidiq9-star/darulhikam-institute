// =========================
// SPLASH SCREEN
// =========================

window.addEventListener("load", () => {

  const splash = document.getElementById("splash-screen");

  if (!splash) return;

  setTimeout(() => {

    splash.classList.add("hide");

    setTimeout(() => {
      splash.remove();
    }, 700);

  }, 1300);

});


// =========================
// SUPABASE
// =========================

const supabaseUrl = "https://ymxuwahcogzbbohdbpgg.supabase.co";

const supabaseKey = "sb_publishable_oAh_xPW62nDFS9JGh5CUcA_mnHC4t3w";

const sb = window.supabase.createClient(supabaseUrl, supabaseKey);


// =========================
// DOM LOADED
// =========================

document.addEventListener("DOMContentLoaded", () => {


  // =========================
  // CONTACT FORM (WEB3FORMS)
  // =========================

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

      e.preventDefault();

      const btn = document.getElementById("submitBtn");
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = "Sending...";

      try {

        const formData = new FormData(contactForm);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          btn.textContent = "Message Sent ✔";
          contactForm.reset();
        } else {
          console.error(result);
          btn.textContent = "Failed ❌";
        }

      } catch (error) {
        console.error(error);
        btn.textContent = "Network Error ❌";
      }

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalText;
      }, 3000);

    });

  }


  // =========================
  // SCROLL REVEAL ANIMATION
  // =========================

  const pageSections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const index = Array.from(pageSections).indexOf(entry.target);

        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 120);

      }

    });

  }, { threshold: 0.15 });

  pageSections.forEach(section => {
    section.classList.add("animate");
    observer.observe(section);
  });


  // =========================
  // AUTO YEAR
  // =========================

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // =========================
  // SCROLL PROGRESS BAR
  // =========================

  const progressBar = document.getElementById("progressBar");

  window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = progress + "%";
    }

  });


  // =========================
  // ACTIVE NAV HIGHLIGHT
  // =========================

  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });

  });


  // =========================
  // HERO PARALLAX
  // =========================

  const heroImage = document.querySelector(".hero-image img");

  window.addEventListener("scroll", () => {
    if (!heroImage) return;
    const offset = window.scrollY * 0.05;
    heroImage.style.transform = `translateY(${offset}px)`;
  });


  // =========================
  // SMOOTH SCROLL
  // =========================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = this.getAttribute("href");
      if (target === "#") return;
      e.preventDefault();
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    });
  });


  // =========================
  // MODAL SETUP
  // =========================

  const modal      = document.getElementById("registerModal");
  const closeBtn   = document.querySelector(".close");
  const levelSelect = document.getElementById("courseLevel");

  // Helper: close modal
  function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Helper: open modal
  function openModal() {
    if (!modal) return;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }


  // =========================
  // ENROLL BUTTON CLICK
  // — Works for BOTH program cards
  //   AND section CTA buttons
  // =========================

  document.querySelectorAll(".enroll-btn").forEach(btn => {

    btn.addEventListener("click", (e) => {

      e.preventDefault();

      const level = btn.dataset.level || "";
      const title = btn.dataset.title || "Begin Your Arabic Journey";
      const desc  = btn.dataset.desc  || "";

      // Is this click coming from inside a program card?
      const fromProgramCard = btn.closest(".program-card") !== null;

      const picker   = document.getElementById("modalProgramPicker");
      const preview  = document.getElementById("modalPreview");
      const titleEl  = document.getElementById("modalTitle");
      const levelText = document.getElementById("selectedLevelText");

      // Set modal heading
      if (titleEl) titleEl.textContent = title;

      if (fromProgramCard) {

        // ── Came from a program card ──
        // Hide the picker, show the pre-filled preview

        if (picker)  picker.classList.add("hidden");
        if (preview) preview.style.display = "block";

        if (levelText) {
          levelText.innerHTML = `You selected: <strong>${level}</strong>`;
        }

        const previewList = document.getElementById("modalPreviewList");
        if (previewList) {
          previewList.innerHTML = `
            <li>${desc || "Structured Arabic learning path"}</li>
            <li>Guided video lessons at your own pace</li>
            <li>Practice exercises and dedicated support</li>
          `;
        }

        if (levelSelect) levelSelect.value = level;

        // Clear any highlighted picker options
        document.querySelectorAll(".modal-program-option")
          .forEach(o => o.classList.remove("selected"));

      } else {

        // ── Came from a section CTA button ──
        // Show the program picker so user can choose their level

        if (picker)  picker.classList.remove("hidden");
        if (preview) preview.style.display = "none";

        if (levelText) {
          levelText.textContent = "Choose your level below to get started";
        }

        if (levelSelect) levelSelect.value = "";

        // Clear previous selection highlight
        document.querySelectorAll(".modal-program-option")
          .forEach(o => o.classList.remove("selected"));

      }

      openModal();

    });

  });


  // =========================
  // PROGRAM PICKER OPTION CLICK
  // (inside the modal)
  // =========================

  const programDescriptions = {
    "Beginner":     "Arabic letters, sounds, basic reading and vocabulary building.",
    "Intermediate": "Grammar foundations, sentence structure and conversation practice.",
    "Advanced":     "Advanced grammar, Qur'anic text comprehension and full fluency."
  };

  document.querySelectorAll(".modal-program-option").forEach(option => {

    option.addEventListener("click", () => {

      const level = option.dataset.level;

      // Highlight the selected card
      document.querySelectorAll(".modal-program-option")
        .forEach(o => o.classList.remove("selected"));
      option.classList.add("selected");

      // Push the value into the hidden select
      if (levelSelect) levelSelect.value = level;

      // Update the level label
      const levelText = document.getElementById("selectedLevelText");
      if (levelText) {
        levelText.innerHTML = `You selected: <strong>${level}</strong>`;
      }

      // Populate & show preview
      const previewList = document.getElementById("modalPreviewList");
      if (previewList) {
        previewList.innerHTML = `
          <li>${programDescriptions[level] || "Structured Arabic learning path"}</li>
          <li>Guided video lessons at your own pace</li>
          <li>Practice exercises and dedicated support</li>
        `;
      }

      const preview = document.getElementById("modalPreview");
      if (preview) preview.style.display = "block";

    });

  });


  // =========================
  // CLOSE MODAL
  // =========================

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });


  // =========================
  // REGISTER FORM — SUPABASE
  // =========================

  const registerForm = document.getElementById("registerForm");

  if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

      e.preventDefault();

      const submitBtn = registerForm.querySelector("button[type='submit']");
      const originalText = submitBtn.textContent;

      try {

        submitBtn.disabled = true;
        submitBtn.textContent = "Registering...";

        const fullName = document.getElementById("fullName").value;
        const email    = document.getElementById("registerEmail").value.trim().toLowerCase();
        const whatsapp = document.getElementById("whatsapp").value;
        const gender   = document.getElementById("gender").value;
        const age      = document.getElementById("age").value;
        const country  = document.getElementById("country").value;
        const level    = document.getElementById("courseLevel").value;
        const passportFile  = document.getElementById("passport").files[0];

        // Guard: make sure a level was chosen
        if (!level) {
          alert("Please select a course level before continuing.");
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          return;
        }

        // CHECK IF STUDENT ALREADY EXISTS
        const { data: existingStudent, error: checkError } = await sb
          .from("students")
          .select("email, matric_number")
          .eq("email", email)
          .maybeSingle();

        if (checkError) throw checkError;

        const successModal   = document.getElementById("successModal");
        const studentIdText  = document.getElementById("studentIdText");
        const successTitle   = document.getElementById("successTitle");
        const successMessage = document.getElementById("successMessage");

        // IF STUDENT ALREADY REGISTERED
        if (existingStudent) {

          submitBtn.disabled = false;
          submitBtn.textContent = originalText;

          successTitle.textContent   = "Already Registered ⚠️";
          successMessage.textContent = "We found your existing record.";
          studentIdText.textContent  = existingStudent.matric_number;

          successModal.classList.add("show");

          document.getElementById("copyIdBtn").onclick = () => {
            navigator.clipboard.writeText(existingStudent.matric_number);
          };

          document.getElementById("closeSuccess").onclick = () => {
            successModal.classList.remove("show");
          };

          return;
        }

              // UPLOAD RECEIPT TO SUPABASE STORAGE
      const fileName = `${Date.now()}-${passportFile.name}`;

      const { error: uploadError } = await sb
        .storage
        .from("passports")
        .upload(fileName, passportFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = sb
        .storage
        .from("passports")
        .getPublicUrl(fileName);

      const passport_url = publicUrlData.publicUrl;


        // INSERT NEW STUDENT
        const { data, error } = await sb
          .from("students")
          .insert([{
            fullname:      fullName,
            email:         email,
            whatsapp:      whatsapp,
            gender:        gender,
            age:           age,
            country:       country,
            level_arabic:  level,
            passport_url
          }])
          .select("matric_number")
          .maybeSingle();

        if (error) {
          if (error.code === "23505") {
            alert("This email is already registered.");
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
          }
          throw error;
        }

        if (!data) {
          alert("Something went wrong. No data returned.");
          return;
        }

        // NOTIFY VIA WEB3FORMS
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: "e6381f96-966a-4491-9847-98d0771b48c4",
            subject: "New Student Registration 🎓",
            message: `
A new student just registered:

Name:    ${fullName}
Email:   ${email}
WhatsApp:${whatsapp}
Country: ${country}
Level:   ${level}
Matric:  ${data.matric_number}
Passport:        ${passport_url}
            `
          })
        });

        // SHOW SUCCESS MODAL
        successTitle.textContent   = "Registration Successful 🎉";
        successMessage.textContent = "Welcome to Dar Al-Ulum!";
        studentIdText.textContent  = data.matric_number;

        successModal.classList.add("show");

        document.getElementById("copyIdBtn").onclick = () => {
          navigator.clipboard.writeText(data.matric_number);
        };

        document.getElementById("closeSuccess").onclick = () => {
          successModal.classList.remove("show");
        };

        // SAVE TO LOCALSTORAGE
        localStorage.setItem("studentCountry", country);

        localStorage.setItem("alBayanUser", JSON.stringify({
          matric_number: data.matric_number,
          fullname:      fullName,
          email:         email,
          country:       country,
          level_arabic:  level,
          plan_type:     level === "Advanced" ? "private" : "general"
        }));

        // REDIRECT TO PAYMENT AFTER 3s
        setTimeout(() => {
          window.location.href = "payment.html";
        }, 3000);

      } catch (err) {

        console.error(err);
        alert("Something went wrong. Please try again.");

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

      }

    });

  }


}); // end DOMContentLoaded


// =========================
// PAYMENT PAGE LOGIC
// =========================

document.addEventListener("DOMContentLoaded", async () => {

  const paymentForm = document.getElementById("paymentForm");

  if (!paymentForm) return;

  // LOAD USER DATA FROM LOCALSTORAGE
  const savedUser = JSON.parse(localStorage.getItem("alBayanUser"));

  const planWrapper = document.getElementById("planTypeWrapper");
  const planField   = document.getElementById("plan_type");

  const africanCountries = [
    "Nigeria", "Ghana", "Kenya", "Uganda", "South Africa"
  ];

  if (savedUser) {

    const isAfrican = africanCountries.includes(savedUser.country);

    if (!isAfrican && planWrapper && planField) {
      planWrapper.style.display = "none";
      planField.value = "international";
    }

    // Autofill the form
    const fields = {
      matric_number: savedUser.matric_number || "",
      payer_name:    savedUser.fullname       || "",
      payer_email:   savedUser.email          || "",
      country:       savedUser.country        || "",
      plan_type:     savedUser.plan_type      || ""
    };

    Object.entries(fields).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.value = value;
    });

  }


  // =========================
  // PAYMENT FORM SUBMIT
  // =========================

  paymentForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn   = paymentForm.querySelector("button");
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "Uploading...";

    try {

      const matric_number   = document.getElementById("matric_number").value;
      const payer_name      = document.getElementById("payer_name").value;
      const payer_email     = document.getElementById("payer_email").value;
      const country         = document.getElementById("country").value;
      const plan_type       = document.getElementById("plan_type").value;
      const level_arabic    = savedUser?.level_arabic || "";
      const amount          = document.getElementById("amount").value;
      const currency        = document.getElementById("currency").value;
      const payment_method  = document.getElementById("payment_method")?.value;
      const receiptFile     = document.getElementById("receipt").files[0];

      const month = new Date().toLocaleString("default", {
        month: "long",
        year:  "numeric"
      });

      // UPLOAD RECEIPT TO SUPABASE STORAGE
      const fileName = `${Date.now()}-${receiptFile.name}`;

      const { error: uploadError } = await sb
        .storage
        .from("payment_receipts")
        .upload(fileName, receiptFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = sb
        .storage
        .from("payment_receipts")
        .getPublicUrl(fileName);

      const receipt_url = publicUrlData.publicUrl;

      // INSERT PAYMENT RECORD
      const { error: paymentError } = await sb
        .from("payments")
        .insert([{
          matric_number,
          payer_name,
          payer_email,
          country,
          level_arabic,
          plan_type,
          month,
          amount,
          currency,
          payment_method,
          receipt_url,
          verification_status: "pending",
          status:              "pending"
        }]);

      if (paymentError) throw paymentError;

      // NOTIFY VIA WEB3FORMS
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "e6381f96-966a-4491-9847-98d0771b48c4",
          subject: "New Payment Submitted 💰",
          message: `
Payment received:

Name:           ${payer_name}
Email:          ${payer_email}
Matric:         ${matric_number}
Amount:         ${amount} ${currency}
Plan:           ${plan_type}
Country:        ${country}
Month:          ${month}
Payment Method: ${payment_method}
Receipt:        ${receipt_url}
          `
        })
      });

      // SHOW SUCCESS POPUP
      const successBox = document.createElement("div");
      successBox.className = "payment-success-modal";
      successBox.innerHTML = `
        <div class="payment-success-content">
          <div class="success-icon">✔</div>
          <h2>Payment Submitted</h2>
          <p>Your payment proof was uploaded successfully. Our team will verify it shortly.</p>
          <button class="success-close-btn">Continue</button>
        </div>
      `;

      document.body.appendChild(successBox);

      setTimeout(() => successBox.classList.add("show"), 100);

      successBox.querySelector(".success-close-btn").addEventListener("click", () => {
        successBox.classList.remove("show");
        setTimeout(() => successBox.remove(), 300);
      });

      submitBtn.textContent = "Submitted ✔";

      // Restore autofilled fields after reset
      setTimeout(() => {
        paymentForm.reset();
        document.getElementById("matric_number").value = matric_number;
        document.getElementById("payer_name").value    = payer_name;
        document.getElementById("payer_email").value   = payer_email;
        document.getElementById("country").value       = country;
      }, 3800);

    } catch (err) {

      console.error(err);
      alert("Failed to submit payment.");

      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

    }

  });

});
