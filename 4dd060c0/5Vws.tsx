export const metadata = {
  title: 'Space Giveaway',
};

const Page = () => {
  return 
    <div class="boom">
      <!-- Header Section -->
      <header>
        <div class="logo">
          <img src="./img/moon-logo.png" alt="Moonly Logo" />
          <p>Moonly</p>
        </div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Tools</a></li>
            <li><a href="#">Market Data</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </nav>
      </header>

      <!-- Main Section -->
      <main>
        <h1>Space Giveaway Creation</h1>
        <br /><br />

        <form>
          <div class="test-container">
            <div>
              <label for="twitter-url">Twitter Spaces URL</label>
              <input type="text" id="twitter-url" name="twitter-url" />
            </div>
          </div>

          <div class="test-container">
            <div>
              <label for="num-winners">Number of winners</label>
              <input type="number" id="num-winners" name="num-winners" />
            </div>
          </div>

          <div class="container">
            <!-- Minimum Time in spaces -->
            <div class="container-1">
              <label for="min-time">Minimum Time in spaces</label>
              <input type="text" id="min-time" name="min-time" />
            </div>
            <!-- Time -->
            <div class="container-2">
              <label for="time">Time</label>
              <select name="time" id="time">
                <option value="minutes">minutes</option>
                <option value="second">second</option>
                <option value="hour">hour</option>
              </select>
            </div>
          </div>

          <div class="test-container">
            <div>
              <label for="user-type">User types</label>
              <input type="text" id="user-type" name="user-type" />
            </div>
          </div>

          <!-- Toggle Switch -->
          <div>
            <label for="follow-required">Follow host required?</label>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>

          <!-- Requirement Section -->
          <div>
            <h2>Holding Requirements</h2>
            <div class="gray-box">
              <div class="container">
                <!-- NFT -->
                <div class="test-container">
                  <div>
                    <label for="nft">NFT</label>
                    <input type="number" />
                  </div>
                </div>

                <!-- Collection -->
                <div class="test-container">
                  <div>
                    <label for="collection">Collection</label>
                    <select name="collection" id="collection">
                      <option value="moonly">moonly</option>
                      <option value="okay bears">okay bears</option>
                    </select>
                  </div>
                </div>

                <!-- Trait -->
                <div class="test-container">
                  <div>
                    <label for="trait">Trait</label>
                    <select name="trait" id="trait">
                      <option value="any">Any</option>
                      <option value="crown">Crown</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="container">
                <!-- NFT -->
                <div class="test-container">
                  <div>
                    <label for="nft">NFT</label>
                    <input type="number" />
                  </div>
                </div>

                <!-- Collection -->
                <div class="test-container">
                  <div>
                    <label for="collection">Collection</label>
                    <select name="collection" id="collection">
                      <option value="moonly">moonly</option>
                      <option value="okay bears">okay bears</option>
                    </select>
                  </div>
                </div>

                <!-- Trait -->
                <div class="test-container">
                  <div>
                    <label for="trait">Trait</label>
                    <select name="trait" id="trait">
                      <option value="any">Any</option>
                      <option value="crown">Crown</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="button" id="add-rule">+ Add Rules</button>
            </div>
          </div>

          <!-- Giveaway Price -->
          <div>
            <h2>Giveaway Price</h2>
            <!-- Name of Price -->
            <div class="test-container">
              <div>
                <label for="prize-name">Name of Price</label>
                <input type="text" id="prize-name" name="prize-name" />
              </div>
            </div>
          </div>
          <button type="submit">Create Space Giveaway</button>
        </form>
      </main>
    </div>
};

export default Page;
