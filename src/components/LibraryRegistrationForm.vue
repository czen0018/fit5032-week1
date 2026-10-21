<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">

        <!-- Heading -->
        <h1 class="text-center mb-2">
          W5. Library Registration Form
        </h1>

        <p class="text-center mb-4">
          Let's build some more advanced features into our form.
        </p>

        <form @submit.prevent="submitForm">

          <!-- Username and Gender -->
          <div class="row mb-3">

            <!-- Username -->
            <div class="col-md-6">
              <label
                for="username"
                class="form-label"
              >
                Username
              </label>

              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
              />

              <div
                v-if="errors.username"
                class="text-danger"
              >
                {{ errors.username }}
              </div>
            </div>

            <!-- Gender -->
            <div class="col-md-6">
              <label
                for="gender"
                class="form-label"
              >
                Gender
              </label>

              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @blur="validateGender"
                @change="validateGender"
              >
                <option value="">
                  Select gender
                </option>

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>

                <option value="other">
                  Other
                </option>
              </select>

              <div
                v-if="errors.gender"
                class="text-danger"
              >
                {{ errors.gender }}
              </div>
            </div>

          </div>


          <!-- Password and Confirm Password -->
          <div class="row mb-3">

            <!-- Password -->
            <div class="col-md-6">
              <label
                for="password"
                class="form-label"
              >
                Password
              </label>

              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @blur="() => validatePassword(true)"
                @input="() => {
                  validatePassword(false)
                  validateConfirmPassword(false)
                }"
              />

              <div
                v-if="errors.password"
                class="text-danger"
              >
                {{ errors.password }}
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="col-md-6">
              <label
                for="confirmPassword"
                class="form-label"
              >
                Confirm password
              </label>

              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
              />

              <div
                v-if="errors.confirmPassword"
                class="text-danger"
              >
                {{ errors.confirmPassword }}
              </div>
            </div>

          </div>


          <!-- Australian Resident -->
          <div class="mb-3">

            <div class="form-check">

              <input
                type="checkbox"
                class="form-check-input"
                id="isAustralian"
                v-model="formData.isAustralian"
                @change="validateResident"
              />

              <label
                class="form-check-label"
                for="isAustralian"
              >
                Australian Resident?
              </label>

            </div>

            <div
              v-if="errors.resident"
              class="text-danger"
            >
              {{ errors.resident }}
            </div>

          </div>


          <!-- Reason for joining -->
          <div class="mb-3">

            <label
              for="reason"
              class="form-label"
            >
              Reason for joining
            </label>

            <textarea
              class="form-control"
              id="reason"
              rows="4"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
            ></textarea>

            <div
              v-if="errors.reason"
              class="text-danger"
            >
              {{ errors.reason }}
            </div>

          </div>


          <!-- Suburb -->
          <div class="mb-3">

            <label
              for="suburb"
              class="form-label"
            >
              Suburb
            </label>

            <input
              type="text"
              class="form-control"
              id="suburb"
              v-bind:value="formData.suburb"
            />

          </div>


          <!-- Buttons -->
          <div class="text-center mb-4">

            <button
              type="submit"
              class="btn btn-primary me-2"
            >
              Submit
            </button>

            <button
              type="button"
              class="btn btn-secondary"
              @click="clearForm"
            >
              Clear
            </button>

          </div>

        </form>


        <!-- PrimeVue DataTable -->
        <div
          class="mt-5"
          v-if="submittedUsers.length"
        >

          <h4 class="mb-3">
            Registered Users
          </h4>

          <DataTable
            :value="submittedUsers"
            tableStyle="min-width: 50rem"
            stripedRows
          >

            <Column
              field="username"
              header="Username"
            />

            <Column
              field="password"
              header="Password"
            />

            <Column
              field="isAustralian"
              header="Australian Resident"
            >
              <template #body="slotProps">
                {{ slotProps.data.isAustralian ? 'true' : 'false' }}
              </template>
            </Column>

            <Column
              field="gender"
              header="Gender"
            />

            <Column
              field="reason"
              header="Reason"
            />

            <Column
              field="suburb"
              header="Suburb"
            />

          </DataTable>

        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'


// Form data
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton'
})


// Submitted users
const submittedUsers = ref([])


// Error messages
const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null
})


// Validate username
const validateName = (blur) => {

  if (formData.value.username.trim().length < 3) {

    if (blur) {
      errors.value.username =
        'Name must be at least 3 characters'
    }

  } else {

    errors.value.username = null

  }
}


// Validate password
const validatePassword = (blur) => {

  const password = formData.value.password
  const minLength = 8

  const hasUppercase =
    /[A-Z]/.test(password)

  const hasLowercase =
    /[a-z]/.test(password)

  const hasNumber =
    /\d/.test(password)

  const hasSpecialChar =
    /[!@#$%^&*(),.?":{}|<>]/.test(password)


  if (password.length < minLength) {

    if (blur) {
      errors.value.password =
        `Password must be at least ${minLength} characters long.`
    }

  } else if (!hasUppercase) {

    if (blur) {
      errors.value.password =
        'Password must contain at least one uppercase letter.'
    }

  } else if (!hasLowercase) {

    if (blur) {
      errors.value.password =
        'Password must contain at least one lowercase letter.'
    }

  } else if (!hasNumber) {

    if (blur) {
      errors.value.password =
        'Password must contain at least one number.'
    }

  } else if (!hasSpecialChar) {

    if (blur) {
      errors.value.password =
        'Password must contain at least one special character.'
    }

  } else {

    errors.value.password = null

  }
}


// Validate confirm password
const validateConfirmPassword = (blur) => {

  const password =
    formData.value.password

  const confirmPassword =
    formData.value.confirmPassword


  if (confirmPassword === '') {

    if (blur) {
      errors.value.confirmPassword =
        'Please confirm your password.'
    }

  } else if (password !== confirmPassword) {

    if (blur) {
      errors.value.confirmPassword =
        'Passwords do not match.'
    }

  } else {

    errors.value.confirmPassword = null

  }
}


// Validate Australian residency
const validateResident = () => {

  if (!formData.value.isAustralian) {

    errors.value.resident =
      'Australian residency confirmation is required.'

  } else {

    errors.value.resident = null

  }
}


// Validate gender
const validateGender = () => {

  if (!formData.value.gender) {

    errors.value.gender =
      'Please select a gender.'

  } else {

    errors.value.gender = null

  }
}


// Validate reason
const validateReason = (blur) => {

  if (formData.value.reason.trim().length < 10) {

    if (blur) {
      errors.value.reason =
        'Reason must be at least 10 characters.'
    }

  } else {

    errors.value.reason = null

  }
}


// Submit form
const submitForm = () => {

  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateResident()
  validateGender()
  validateReason(true)


  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.resident &&
    !errors.value.gender &&
    !errors.value.reason
  ) {

    submittedUsers.value.push({
      username: formData.value.username,
      password: formData.value.password,
      isAustralian: formData.value.isAustralian,
      gender: formData.value.gender,
      reason: formData.value.reason,
      suburb: formData.value.suburb
    })

    clearForm()
  }
}


// Clear form
const clearForm = () => {

  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton'
  }

  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null
  }
}
</script>


<style scoped>
.text-danger {
  margin-top: 5px;
  font-size: 0.9rem;
}

h1 {
  font-weight: 600;
}

.form-control,
.form-select {
  min-height: 42px;
}

textarea.form-control {
  min-height: 110px;
}

@media (max-width: 767px) {
  .col-md-6 {
    margin-bottom: 15px;
  }
}
</style>