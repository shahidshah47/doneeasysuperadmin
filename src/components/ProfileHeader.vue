<template>
  <header class="profile-header">
    <div class="profile-image-wrapper position-relative">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c00e6630426252df10a3e5198d42aa57c56fe605a8862b6b474da9a3f34065ec?placeholderIfAbsent=true&apiKey=8b21d8e85c2c46cba1ed62101821a18e"
        class="profile-image"
        alt="User profile"
      />
      <span class="badge percentage-badge text-bg-primary">50% complete</span>
    </div>
    <div class="profile-info">
      <div class="profile-status">
        <div class="status-label">
          <span class="status-text">Active</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7fa5745e9ce934738f3c7c471924ca75ebd2fa8b2282ca7278f60b7b13917a2b?placeholderIfAbsent=true&apiKey=8b21d8e85c2c46cba1ed62101821a18e"
            class="status-icon"
            alt=""
          />
        </div>
        <button class="btn btn-sm btn-primary rounded-3 px-3 py-1" style="text-transform: none !important;">Admin</button>
      </div>
      <div class="user-details">
        <h1 class="user-name">Esther Howard</h1>
        <p class="user-id">ID OFC 903823</p>
      </div>
    </div>
    <div class="user-stats">
      <div class="stat-item">
        <h2 class="stat-title">Revenue Contribution</h2>
        <p class="stat-value"><span class="currency">AED</span> 332,100</p>
      </div>
      <div class="stat-item">
        <h2 class="stat-title">No. of Order Completed</h2>
        <p class="stat-value">2190</p>
      </div>
      <div class="stat-item">
        <h2 class="stat-title">Assign. of Verticals</h2>
        <p class="stat-value">01</p>
      </div>
      <div class="stat-item">
        <h2 class="stat-title">Rating</h2>
        <div class="rating-wrapper">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/262be8540299558ad8b1be7b8117d57c868178db888c604fb9daa00c0e04d96e?placeholderIfAbsent=true&apiKey=8b21d8e85c2c46cba1ed62101821a18e"
            class="rating-stars"
            alt="Rating stars"
          />
          <span class="rating-value">4.5</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "ProfileHeader",
};
</script>

<style scoped>
.profile-header {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
}

.profile-image-wrapper {
  display: flex;
  text-align: center;
}

.profile-image {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 92px;
  z-index: 10;
}

.profile-info {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  justify-content: start;
  margin-left: 20px;
}

.profile-status {
  display: flex;
  align-items: start;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
}

.status-label {
  align-items: center;
  background-color: #d6ffef;
  border-radius: 8px;
  color: #00995c;
  display: flex;
  gap: 4px;
  justify-content: start;
  min-height: 24px;
  padding: 0 8px;
}

.status-text {
  align-self: stretch;
  margin: auto 0;
  width: 52px;
}

.status-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 12px;
}

.role-label {
  align-self: stretch;
  background: linear-gradient(
    98deg,
    #38e0b2 -18.55%,
    #442ae8 28.45%,
    #5925eb 64.63%,
    #9e21ee 116.94%
  );
  border-radius: 8px;
  color: #f2f4fb;
  min-height: 24px;
  padding: 0 8px;
  width: 68px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  color: #0e0d35;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}

.user-id {
  color: #6e6e86;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
}

.user-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  line-height: 1.2;
  margin: auto 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-title {
  color: #5825eb;
  font-size: 12px;
  font-weight: 600;
}

.stat-value {
  color: #0e0d35;
  font-size: 24px;
  font-weight: 700;
  margin-top: 6px;
}

.currency {
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
}

.rating-wrapper {
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 16px;
  color: #0e0d35;
  margin-top: 8px;
}

.rating-stars {
  aspect-ratio: 5.95;
  object-fit: contain;
  object-position: center;
  width: 131px;
}

.rating-value {
  background-color: #f2f4fb;
  border-radius: 23.214px;
  padding: 3px 16px;
}

.percentage-badge {
  position: absolute;
  bottom: -6%;
}

@media (max-width: 991px) {
  .profile-header,
  .user-stats {
    max-width: 100%;
  }
}
</style>
