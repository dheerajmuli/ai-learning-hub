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

// Opens the Modal and loads the blog content
function openModal(blogId) {
    const post = blogData[blogId];
    if (!post) return;

    // Save current active element for accessibility return
    lastFocusedElement = document.activeElement;

    // Load content
    modalDate.textContent = post.date;
    modalReadTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${post.readTime}`;
    
    // Status text & class reset
    modalStatus.textContent = post.status;
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
    document.remove('keydown', handleKeyDown);
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
    // Event delegation for "Read More" buttons
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.read-more-btn');
        if (btn) {
            const blogId = btn.getAttribute('data-blog-id');
            openModal(blogId);
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
