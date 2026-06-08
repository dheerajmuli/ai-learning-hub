/**
 * AI Learning Hub - Portfolio & Blog Functionality
 * Author: Antigravity Code Assistant
 * Date: May 24, 2026
 */

// ==========================================================================
// BLOG DATABASE (Rich text content for modal popup)
// ==========================================================================
const blogData = {
    transformers: {
        title: "Demystifying Self-Attention in Transformer Models",
        date: "May 24, 2026",
        readTime: "6 min read",
        status: "Completed",
        statusClass: "status-completed",
        image: "assets/blog1.png",
        content: `
            <p>Self-attention is the architectural breakthrough that powers today's Large Language Models (LLMs) like GPT-4, Claude, and Gemini. Unlike older models that read text sequentially, Self-Attention allows a model to weigh the relevance of all other words in a sentence relative to the word it is processing, in parallel.</p>
            
            <h4>The Analogy: Database Querying</h4>
            <p>To understand self-attention mathematically, it helps to use the analogy of a database search. For every word (token) in a sentence, the transformer generates three vectors:</p>
            <ul>
                <li><strong>Query (Q)</strong>: The vector representing "what this token is currently searching for".</li>
                <li><strong>Key (K)</strong>: The vector representing "what this token contains, or its label".</li>
                <li><strong>Value (V)</strong>: The vector representing "the actual content/meaning of this token".</li>
            </ul>
            <p>By multiplying the Query of word A with the Key of word B, we get an attention score showing how much word A should focus on word B. We then normalize these scores and multiply them by the Values to retrieve the final representation.</p>

            <h4>The Math Formula</h4>
            <p>The Scaled Dot-Product Attention equation is written as:</p>
            <p style="text-align: center; font-family: var(--font-mono); background: rgba(30, 41, 59, 0.4); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin: 20px 0; font-size: 1rem; color: var(--accent-cyan);">
                Attention(Q, K, V) = softmax( (Q &middot; K<sup>T</sup>) / &radic;d<sub>k</sub> ) &middot; V
            </p>
            <p>Where <code>d<sub>k</sub></code> is the dimension of the keys. Division by the square root of <code>d<sub>k</sub></code> acts as a scaling factor, keeping gradients stable during training.</p>

            <h4>A Minimal Implementation in PyTorch</h4>
            <p>Here is how you write a single scaled dot-product attention step in PyTorch:</p>
            <pre style="background: rgba(30, 41, 59, 0.5); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); overflow-x: auto; font-family: var(--font-mono); font-size: 0.85rem; margin: 20px 0; color: #e2e8f0;"><code><span class="keyword" style="color: #f472b6;">import</span> torch
<span class="keyword" style="color: #f472b6;">import</span> torch.nn.functional <span class="keyword" style="color: #f472b6;">as</span> F

<span class="keyword" style="color: #f472b6;">def</span> <span class="function-name" style="color: var(--accent-cyan);">scaled_dot_product_attention</span>(q, k, v, mask=None):
    d_k = q.size(-1)
    scores = torch.matmul(q, k.transpose(-2, -1)) / torch.sqrt(torch.tensor(d_k, dtype=torch.float32))
    
    <span class="keyword" style="color: #f472b6;">if</span> mask <span class="keyword" style="color: #f472b6;">is not</span> None:
        scores = scores.masked_fill(mask == <span class="number" style="color: var(--accent-yellow);">0</span>, -<span class="number" style="color: var(--accent-yellow);">1e9</span>)
        
    attention_weights = F.softmax(scores, dim=-<span class="number" style="color: var(--accent-yellow);">1</span>)
    output = torch.matmul(attention_weights, v)
    <span class="keyword" style="color: #f472b6;">return</span> output, attention_weights</code></pre>

            <h4>Why It Matters</h4>
            <p>Self-attention enables models to understand context perfectly. In the sentences <em>"The bank of the river"</em> and <em>"The bank deposit"</em>, self-attention maps the word <em>"bank"</em> to different contextual clusters dynamically. My next goal is to implement multi-head attention blocks, where multiple attention layers process the text in parallel to capture distinct linguistic relationships.</p>
        `
    },
    qlearning: {
        title: "My First Reinforcement Learning Agent: Q-Learning in Gym",
        date: "May 18, 2026",
        readTime: "8 min read",
        status: "In Progress",
        statusClass: "status-progress",
        image: "assets/project2.png",
        content: `
            <p>Reinforcement Learning (RL) is a paradigm of machine learning where an agent learns to navigate an environment to maximize cumulative reward. Unlike supervised learning, there are no static labels; the agent learns entirely from trial and error.</p>
            
            <h4>The Q-Learning Algorithm</h4>
            <p>Q-learning is a model-free, off-policy RL algorithm used to find the best action to take given the current state. The algorithm maintains a Q-Table—a matrix mapping <code>(State, Action)</code> pairs to a numerical score (Q-value). The update is governed by the Bellman Equation:</p>
            <p style="text-align: center; font-family: var(--font-mono); background: rgba(30, 41, 59, 0.4); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin: 20px 0; font-size: 1rem; color: var(--accent-yellow);">
                Q(s, a) &larr; Q(s, a) + &alpha; [ R + &gamma; max<sub>a'</sub> Q(s', a') - Q(s, a) ]
            </p>
            <p>Where:</p>
            <ul>
                <li><code>&alpha;</code> (Alpha) is the Learning Rate, determining how much new information overrides old values.</li>
                <li><code>&gamma;</code> (Gamma) is the Discount Factor, dictating the importance of future rewards vs. immediate rewards.</li>
                <li><code>R</code> is the immediate reward returned by the environment.</li>
                <li><code>max Q(s', a')</code> is the estimated optimal future Q-value in the next state.</li>
            </ul>

            <h4>The Exploration vs. Exploitation Trade-off</h4>
            <p>In training my agent inside Gymnasium's <code>FrozenLake-v1</code> environment, the primary challenge was balance. If the agent always chooses the highest Q-value action (exploitation), it stops finding new, better paths. If it always acts randomly (exploration), it never converges.</p>
            <p>I resolved this using an <strong>Epsilon-Greedy</strong> strategy. Epsilon (<code>&epsilon;</code>) starts at 1.0 (pure exploration) and decays exponentially after each training episode down to a minimum of 0.05. This allowed the agent to explore widely at first, then settle into its optimal policy.</p>

            <h4>Key Learnings</h4>
            <ol>
                <li><strong>Reward Sparsity</strong>: In environments like FrozenLake, the agent only gets a reward of 1 when it reaches the goal; all other steps reward 0. This makes it difficult for Q-tables to update initially. Creating customized, dense step rewards made training 5x faster.</li>
                <li><strong>Hyperparameter Sensitivity</strong>: A small change in the epsilon decay rate can mean the difference between an agent that solves the maze in 200 episodes vs. one that fails after 2000.</li>
            </ol>
        `
    },
    finetuning: {
        title: "Fine-Tuning a Custom Llama-3 Model for Coding Tasks",
        date: "May 10, 2026",
        readTime: "5 min read",
        status: "Concept",
        statusClass: "status-concept",
        image: "assets/project3.png",
        content: `
            <p>Large Language Models are excellent at general tasks, but they often struggle with highly specialized formatting, syntax edge-cases, or custom APIs. Fine-tuning adaptation is the path to resolving these limitations. This entry details my setup for fine-tuning Llama-3-8B locally.</p>
            
            <h4>Low-Rank Adaptation (LoRA)</h4>
            <p>Training an 8-Billion parameter model directly requires enterprise-grade multi-GPU infrastructure. LoRA bypasses this requirement. Instead of updating all weights, LoRA freezes the original model parameters and injects small rank-decomposition matrices into the attention projection weights (e.g., query, value projection matrices).</p>
            <p>Combining LoRA with 4-bit precision quantization (QLoRA) reduces memory usage drastically, allowing me to fine-tune the model on a standard desktop graphics card with 16GB of VRAM.</p>

            <h4>Training Pipeline Configurations</h4>
            <p>I structured my fine-tuning script using Hugging Face's <code>SFTTrainer</code> (Supervised Fine-Tuning Trainer) and PEFT. Here are the core hyperparameters used:</p>
            <ul>
                <li><strong>LoRA Rank (r)</strong>: 8</li>
                <li><strong>LoRA Alpha (&alpha;)</strong>: 16 (scaling factor)</li>
                <li><strong>Target Modules</strong>: q_proj, v_proj, k_proj, o_proj</li>
                <li><strong>Learning Rate</strong>: 2e-4</li>
                <li><strong>Batch Size</strong>: 4 (with gradient accumulation steps = 4)</li>
                <li><strong>Quantization</strong>: 4-bit NF4 (NormalFloat4)</li>
            </ul>

            <h4>Results and Observations</h4>
            <p>After 3 epochs on a dataset containing 10,000 high-quality programming challenges, the fine-tuned model outperformed the base model in writing valid, syntactically correct JavaScript modules by 22%. Crucially, the model learned to consistently wrap responses in correct markdown blocks, simplifying automated validation pipelines.</p>
        `
    }
};

// ==========================================================================
// PROJECTS DATABASE (Rich text content for project card details)
// ==========================================================================
const projectData = {
    neurosketch: {
        title: "NeuroSketch: Generative Art (WGAN-GP)",
        date: "Deep Learning Model",
        readTime: "Completed",
        status: "PyTorch & PIL",
        statusClass: "status-completed",
        image: "assets/project1.png",
        content: `
            <p><strong>NeuroSketch</strong> is a generative adversarial machine learning project that implements a **Wasserstein GAN with Gradient Penalty (WGAN-GP)** to synthesize abstract digital paintings.</p>
            
            <h4>What It Does</h4>
            <p>The model learns the patterns of overlapping geometries, color blends, and organic splines. Instead of relying on a pre-downloaded dataset, the code contains a procedural image engine that renders infinite canvases on-the-fly. The project includes a Streamlit interface where users can morph between paintings in real-time by interpolating the 100-dimensional latent space.</p>
            
            <h4>How It Works</h4>
            <ul>
                <li><strong>Stable Training (Wasserstein Loss)</strong>: Standard GANs suffer from vanishing gradients and mode collapse. WGAN-GP fixes this by optimizing the Earth Mover's Distance, which measures the work needed to morph the generated distribution into the real distribution.</li>
                <li><strong>Gradient Penalty (GP)</strong>: Stabilizes the network by penalizing the Critic if the norm of its gradients deviates from 1, enforcing 1-Lipschitz continuity.</li>
                <li><strong>Network Architectures</strong>: The Generator uses Transposed Convolutions (<code>ConvTranspose2d</code>), Batch Normalization, and ReLU layers. The Critic uses 2D Convolutions with Layer Normalization (using GroupNorm) and LeakyReLU activations.</li>
            </ul>
            
            <h4>Technical Stack & File Roles</h4>
            <ul>
                <li><code>dataset.py</code>: Renders custom bezier shapes, gradients, and blurs in memory, outputting normalized tensors.</li>
                <li><code>model.py</code>: Implements Generator and Critic network layouts.</li>
                <li><code>train.py</code>: Handles gradient penalties, alternates updates (5 Critic steps per 1 Generator step), and saves weights.</li>
                <li><code>app.py</code>: Streamlit app calculating Linear Interpolations (LERP) between latent vectors in real-time.</li>
            </ul>
        `
    },
    deeptrader: {
        title: "DeepTrader: Reinforcement Learning Portfolio Optimizer",
        date: "Reinforcement Learning",
        readTime: "Active",
        status: "Gymnasium & PPO",
        statusClass: "status-progress",
        image: "assets/project2.png",
        content: `
            <p><strong>DeepTrader</strong> is a deep reinforcement learning trading agent trained to optimize stock and crypto portfolio allocations under high volatility.</p>
            
            <h4>What It Does</h4>
            <p>The agent rebalances asset weights dynamically, seeking to maximize the risk-adjusted Sharpe Ratio while accounting for transaction fees, slippage, and delays.</p>
            
            <h4>How It Works</h4>
            <ul>
                <li><strong>Proximal Policy Optimization (PPO)</strong>: Uses actor-critic methods to ensure stable learning updates in continuous action spaces.</li>
                <li><strong>State Inputs</strong>: Takes rolling historical returns, moving averages, relative strength index (RSI), and sentiment indicators.</li>
                <li><strong>Custom MDP Environment</strong>: Built a custom Gymnasium interface simulating database ledgers and asset price updates.</li>
            </ul>
        `
    },
    sentientnlp: {
        title: "SentientNLP: Fine-tuned Sentiment Classifier",
        date: "Natural Language Processing",
        readTime: "Completed",
        status: "Transformers & FastAPI",
        statusClass: "status-completed",
        image: "assets/project3.png",
        content: `
            <p><strong>SentientNLP</strong> is a custom-trained transformer model fine-tuned on customer conversation logs to classify emotional states.</p>
            
            <h4>What It Does</h4>
            <p>Parses live chat logs, scoring messages across emotional indices (e.g., frustration, satisfaction, confusion). It maintains a 94.2% accuracy rate on test communication streams.</p>
            
            <h4>How It Works</h4>
            <ul>
                <li><strong>Transformer Fine-tuning</strong>: Fine-tuned a RoBERTa-base model using LoRA adapters.</li>
                <li><strong>Data Augmentation</strong>: Leveraged back-translation techniques to expand sparse emotional categories.</li>
                <li><strong>Microservices</strong>: Packaged inside Docker containers and exposed via a FastAPI REST endpoint.</li>
            </ul>
        `
    }
};

// ==========================================================================
// MODAL SYSTEM CONTROLLER
// ==========================================================================
const modal = document.getElementById('blog-modal');
const modalContainer = modal.querySelector('.modal-container');
const modalCloseBtn = document.getElementById('modal-close');
const modalDate = document.getElementById('modal-date');
const modalReadTime = document.getElementById('modal-read-time');
const modalStatus = document.getElementById('modal-status');
const modalTitle = document.getElementById('modal-title');
const modalImageContainer = document.getElementById('modal-image-container');
const modalBodyContent = document.getElementById('modal-body-content');

let lastFocusedElement = null;

// Opens the Modal and loads the content (supports both blog posts and projects)
function openModal(itemId, type = 'blog') {
    const post = (type === 'blog') ? blogData[itemId] : projectData[itemId];
    if (!post) return;

    // Save current active element for accessibility return
    lastFocusedElement = document.activeElement;

    // Load content based on type
    if (type === 'blog') {
        modalDate.textContent = post.date;
        modalReadTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${post.readTime}`;
        modalStatus.textContent = post.status;
    } else {
        // Projects metadata adjustments
        modalDate.textContent = post.date; // Category / Type
        modalReadTime.innerHTML = `<i class="fa-solid fa-code"></i> ${post.status}`; // Tech stack info
        modalStatus.textContent = post.readTime; // Project status (Completed/Active)
    }
    
    modalStatus.className = `journal-status ${post.statusClass}`;
    modalTitle.textContent = post.title;
    
    // Load Image
    modalImageContainer.innerHTML = `<img src="${post.image}" alt="${post.title} featured illustration">`;
    
    // Load Rich Text
    modalBodyContent.innerHTML = post.content;

    // Toggle Modal visibility classes
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    
    // Accessibility: Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    // Accessibility: Move focus to the modal container
    setTimeout(() => {
        modalContainer.focus();
    }, 50);

    // Bind event listeners
    document.addEventListener('keydown', handleKeyDown);
}

// Closes the Modal
function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    
    // Restore scrolling
    document.body.style.overflow = '';

    // Restore focus to original triggering button
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }

    // Clean up event listeners
    document.removeEventListener('keydown', handleKeyDown);
}

// Intercepts Keyboard keys for Modal navigation (Accessibility Focus Trap & Escape Close)
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        closeModal();
        return;
    }

    if (e.key === 'Tab') {
        // Find all focusable elements inside the modal container
        const focusableElements = modalContainer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Shift + Tab: Loop to the end if we hit the beginning
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } 
        // Tab: Loop to the beginning if we hit the end
        else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
}

// Setup Event Listeners
function initModalSystem() {
    // Event delegation for "Read More" buttons (Blogs)
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.read-more-btn');
        if (btn) {
            const blogId = btn.getAttribute('data-blog-id');
            openModal(blogId, 'blog');
        }
    });

    // Event delegation for Project Cards (opens project details modal on click)
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.project-card');
        const linkBtn = e.target.closest('.project-link-btn');
        
        // If clicking the card but NOT clicking one of the direct external link buttons (GitHub / Demo)
        if (card && !linkBtn) {
            const projectId = card.getAttribute('data-project-id');
            openModal(projectId, 'project');
        }
    });

    // Close on click close button
    modalCloseBtn.addEventListener('click', closeModal);

    // Close on click outside container (on the backdrop overlay)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// ==========================================================================
// SCROLL EFFECTS & NAVIGATION ACTIVE TRACKING
// ==========================================================================
function initScrollEffects() {
    const header = document.querySelector('.site-header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header background fade on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.backgroundColor = 'rgba(9, 13, 22, 0.9)';
        } else {
            header.style.boxShadow = '';
            header.style.backgroundColor = 'rgba(9, 13, 22, 0.7)';
        }
    });

    // Highlight current nav link on scroll using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the active viewing zone
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// ==========================================================================
// FADE-IN SCROLL REVEAL ANIMATIONS
// ==========================================================================
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.project-card, .blog-item, .hero-content, .hero-visual');
    
    // Add base CSS styling directly to elements for scroll state
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before screen entry
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// ==========================================================================
// APP INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initModalSystem();
    initScrollEffects();
    initRevealAnimations();
});
