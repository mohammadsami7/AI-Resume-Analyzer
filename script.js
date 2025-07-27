
        // Global variables
        let isAnalyzing = false;

        // Word count functionality
        function updateWordCount(textareaId, countId) {
            const textarea = document.getElementById(textareaId);
            const countElement = document.getElementById(countId);
            const words = textarea.value.trim().split(/\s+/).filter(word => word.length > 0);
            countElement.textContent = `${words.length} words`;
        }

        // File upload functionality
        function handleFileUpload(fileInputId, textareaId) {
            const fileInput = document.getElementById(fileInputId);
            const textarea = document.getElementById(textareaId);
            const fileName = fileInput.parentElement.querySelector('.file-name');
            
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    fileName.textContent = file.name;
                    // Simulate file reading (in real app, you'd use FileReader)
                    textarea.value = `[Content from ${file.name}]\n\nThis is simulated content. In a real application, the file would be processed and its content would appear here.`;
                    updateWordCount(textareaId, textareaId.replace('-input', '-word-count'));
                }
            });
        }

        // Toast notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Collapsible panel
        function toggleCollapsible() {
            const content = document.getElementById('collapsible-content');
            const chevron = document.getElementById('chevron');
            
            content.classList.toggle('active');
            chevron.classList.toggle('rotated');
        }

        // Generate mock analysis results
        function generateMockResults() {
            const matchedKeywords = ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Git', 'Agile', 'Problem Solving'];
            const missingKeywords = ['TypeScript', 'Docker', 'AWS', 'MongoDB', 'Testing', 'CI/CD'];
            const insights = [
                { text: 'Professional Summary', status: '✅' },
                { text: 'Skills Section', status: '✅' },
                { text: 'Work Experience', status: '✅' },
                { text: 'Education', status: '✅' },
                { text: 'Projects Section', status: '❌' },
                { text: 'Certifications', status: '❌' }
            ];
            const feedback = [
                'Add a projects section to showcase your practical experience',
                'Include more specific technical skills mentioned in the job description',
                'Quantify your achievements with numbers and metrics',
                'Consider adding relevant certifications',
                'Use action verbs to start your bullet points',
                'Tailor your professional summary to match the job requirements'
            ];

            return {
                score: Math.floor(Math.random() * 40) + 60, // Score between 60-100
                matchedKeywords,
                missingKeywords,
                insights,
                feedback
            };
        }

        // Display results
        function displayResults(results) {
            const resultsSection = document.getElementById('results-section');
            const atsScore = document.getElementById('ats-score');
            const scoreProgress = document.getElementById('score-progress');
            const matchedKeywords = document.getElementById('matched-keywords');
            const missingKeywords = document.getElementById('missing-keywords');
            const resumeInsights = document.getElementById('resume-insights');
            const feedbackTips = document.getElementById('feedback-tips');

            // Show results section
            resultsSection.style.display = 'block';

            // Update ATS Score
            atsScore.textContent = results.score;
            scoreProgress.style.width = `${results.score}%`;
            scoreProgress.textContent = `${results.score}%`;
            
            // Color code the score
            atsScore.className = 'score-display';
            scoreProgress.className = 'progress-bar';
            if (results.score >= 80) {
                atsScore.classList.add('score-excellent');
                scoreProgress.style.backgroundColor = '#4CAF50';
            } else if (results.score >= 60) {
                atsScore.classList.add('score-good');
                scoreProgress.style.backgroundColor = '#FF9800';
            } else {
                atsScore.classList.add('score-poor');
                scoreProgress.style.backgroundColor = '#F44336';
            }

            // Update matched keywords
            matchedKeywords.innerHTML = '';
            results.matchedKeywords.forEach(keyword => {
                const tag = document.createElement('span');
                tag.className = 'tag tag-matched';
                tag.textContent = keyword;
                matchedKeywords.appendChild(tag);
            });

            // Update missing keywords
            missingKeywords.innerHTML = '';
            results.missingKeywords.forEach(keyword => {
                const tag = document.createElement('span');
                tag.className = 'tag tag-missing';
                tag.textContent = keyword;
                missingKeywords.appendChild(tag);
            });

            // Update insights
            resumeInsights.innerHTML = '';
            results.insights.forEach(insight => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${insight.status}</span> ${insight.text}`;
                resumeInsights.appendChild(li);
            });

            // Update feedback
            feedbackTips.innerHTML = '';
            results.feedback.forEach(tip => {
                const li = document.createElement('li');
                li.textContent = tip;
                feedbackTips.appendChild(li);
            });

            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Analyze resume
        async function analyzeResume() {
            const resumeInput = document.getElementById('resume-input');
            const jobInput = document.getElementById('job-input');
            const analyzeBtn = document.getElementById('analyze-btn');
            const spinner = document.getElementById('spinner');
            const analyzeText = document.getElementById('analyze-text');

            // Validation
            if (!resumeInput.value.trim() || !jobInput.value.trim()) {
                alert('Please fill in both resume and job description fields.');
                return;
            }

            // Start analysis
            isAnalyzing = true;
            analyzeBtn.disabled = true;
            spinner.style.display = 'inline-block';
            analyzeText.textContent = 'Analyzing...';

            // Simulate analysis delay
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Generate and display results
            const results = generateMockResults();
            displayResults(results);

            // Reset button state
            isAnalyzing = false;
            analyzeBtn.disabled = false;
            spinner.style.display = 'none';
            analyzeText.textContent = '🔍 Analyze Resume';

            // Show success toast
            showToast('Analysis complete! 🎉');
        }

        // Reset form
        function resetForm() {
            document.getElementById('resume-input').value = '';
            document.getElementById('job-input').value = '';
            document.getElementById('resume-file').value = '';
            document.getElementById('job-file').value = '';
            document.getElementById('results-section').style.display = 'none';
            
            // Reset file names
            document.querySelectorAll('.file-name').forEach(el => el.textContent = '');
            
            // Reset word counts
            updateWordCount('resume-input', 'resume-word-count');
            updateWordCount('job-input', 'job-word-count');
            
            showToast('Form reset successfully! 🔄');
        }

        // Initialize event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Word count listeners
            document.getElementById('resume-input').addEventListener('input', () => {
                updateWordCount('resume-input', 'resume-word-count');
            });
            
            document.getElementById('job-input').addEventListener('input', () => {
                updateWordCount('job-input', 'job-word-count');
            });

            // File upload listeners
            handleFileUpload('resume-file', 'resume-input');
            handleFileUpload('job-file', 'job-input');

            // Button listeners
            document.getElementById('analyze-btn').addEventListener('click', analyzeResume);
            document.getElementById('reset-btn').addEventListener('click', resetForm);

            // Initialize word counts
            updateWordCount('resume-input', 'resume-word-count');
            updateWordCount('job-input', 'job-word-count');
        });
 